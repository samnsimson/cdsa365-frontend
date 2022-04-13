import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { config } from '../config/config'
import {
    FolderIcon,
    MailIcon,
    PencilIcon,
    ThumbDownIcon,
    ThumbUpIcon,
    UserGroupIcon,
} from '@heroicons/react/solid'
import moment from 'moment-timezone'
import Modal from '../components/modal'
import AddCategoryDropdown from '../components/add-category-dropdown'
import LoadingPlaceholder from '../components/loading-placeholder'
import Placeholder from '../components/placeholder'
import Badge from '../components/badge'
import AddClassDropdown from '../components/add-class-dropdown'
import SetStudentFee from '../components/set-student-fee'
import { Link } from 'react-router-dom'

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ListStudents = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedStudents, setSelectedStudents] = useState([])
    const [targetStudent, setTargetStudent] = useState(null)
    const [openFeeModal, setOpenFeeModal] = useState(false)
    const [openCatModal, setOpenCatModal] = useState(false)
    const [openClassModal, setOpenClassModal] = useState(false)
    const defaultCategory = { name: 'Select a category', disabled: true }
    const [categories, setCategories] = useState([defaultCategory])
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(classes[0])
    const [showLoader, setShowLoader] = useState(true)
    const [students, setStudents] = useState({
        Active: [],
        Pending: [],
        Rejected: [],
    })

    const fetchStudents = () => {
        axios
            .get(config.api.getAllStudents)
            .then(({ data }) => {
                data.map((item) => (item.isChecked = false))
                setStudents({
                    Active: data.filter((o) => o.status === 1),
                    Pending: data.filter((o) => o.status === 0),
                    Rejected: data.filter((o) => o.status === 2),
                })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setShowLoader(false))
    }

    const handleAllChecked = (e) => {
        let { Pending, Active, Rejected } = students
        switch (selectedIndex) {
            case 0:
                Active.forEach((o) => (o.isChecked = e.target.checked))
                setStudents((state) => ({ ...state, Active: Active }))
                break
            case 1:
                Pending.forEach((o) => (o.isChecked = e.target.checked))
                setStudents((state) => ({ ...state, Pending: Pending }))
                break
            case 2:
                Rejected.forEach((o) => (o.isChecked = e.target.checked))
                setStudents((state) => ({ ...state, Rejected: Rejected }))
                break
            default:
                break
        }
    }

    const handleCheckboxChange = (e) => {
        Object.entries(students).forEach(([key, values]) => {
            values.map((value) => {
                if (+value.id === +e.target.value) {
                    value.isChecked = e.target.checked
                }
                return value
            })
            setStudents((state) => ({ ...state, [key]: values }))
        })
    }

    const handleThumbsUp = (id) => {
        triggerModal('fee', id)
    }

    const rejectStudent = (id) => {
        const url = config.api.updateStudent + `/${id}`
        axios
            .put(url, { status: 2 })
            .then(() => fetchStudents())
            .catch((err) => console.log(err))
    }

    const triggerModal = (modalFor, id = null) => {
        id ? setTargetStudent(id) : setTargetStudent(null)
        switch (modalFor) {
            case 'category':
                fetchCategories().finally(() => setOpenCatModal(true))
                break
            case 'class':
                fetchClasses().finally(() => setOpenClassModal(true))
                break
            case 'fee':
                setOpenFeeModal(true)
                break
            default:
                break
        }
    }

    const fetchCategories = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = config.api.getCategory + '/student'
                const { data } = await axios.get(url)
                if (data.length) setCategories([...data])
                resolve(true)
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })
    }

    const fetchClasses = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get(config.api.fetchAllClasses).then(({ data }) => {
                    setClasses([...data])
                    resolve(true)
                })
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })
    }

    const addToCategory = async () => {
        try {
            const url = config.api.addUserToCategory + '/student'
            const { data } = await axios.post(url, {
                cat_id: selectedCategory.id,
                user_list: targetStudent
                    ? [targetStudent]
                    : selectedStudents.map((user) => user.id),
            })
            if (data) fetchStudents()
        } catch (error) {
            console.log(error)
        } finally {
            if (openCatModal) setOpenCatModal(false)
        }
    }

    const addToClass = () => {
        const url = config.api.addStudentToClass + `/${selectedClass.id}`
        axios
            .post(url, {
                list: targetStudent
                    ? [targetStudent]
                    : selectedStudents.map((ss) => ss.id),
            })
            .catch((err) => console.log(err.response.data))
            .finally(() => {
                if (openClassModal) setOpenClassModal(false)
            })
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    useEffect(() => {
        Object.values(students).forEach((values) => {
            values.map((value) => (value.isChecked = false))
        })
        setSelectedStudents([])
    }, [selectedIndex])

    useEffect(() => {
        const active = students.Active.filter((o) => o.isChecked)
        const pending = students.Pending.filter((o) => o.isChecked)
        const rejected = students.Rejected.filter((o) => o.isChecked)
        setSelectedStudents([...active, ...pending, ...rejected])
        if (openCatModal) setOpenCatModal(false)
        if (openClassModal) setOpenClassModal(false)
    }, [students])

    return (
        <div className="px-6 py-4">
            <div className="w-full py-4 flex justify-between items-center">
                <h4 className="font-semibold text-gray-500">All Students</h4>
                {selectedStudents.length > 0 && (
                    <div className="flex space-x-1">
                        {selectedIndex === 0 && (
                            <>
                                <button
                                    className="btn btn-gray btn-sm"
                                    onClick={() => triggerModal('category')}
                                >
                                    <FolderIcon className="w-4 h-4 mr-2" />
                                    Add to category
                                </button>
                                <button
                                    className="btn btn-gray btn-sm"
                                    onClick={() => triggerModal('class')}
                                >
                                    <UserGroupIcon className="w-4 h-4 mr-2" />
                                    Add to class
                                </button>
                            </>
                        )}
                        {selectedIndex === 1 && (
                            <>
                                <button className="btn btn-success btn-sm">
                                    <ThumbUpIcon className="w-4 h-4" />
                                </button>
                                <button className="btn btn-danger btn-sm">
                                    <ThumbDownIcon className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        {selectedIndex === 2 && (
                            <>
                                <button className="btn btn-success btn-sm">
                                    <ThumbUpIcon className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full px-2 pb-4 sm:px-0">
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                >
                    <Tab.List className="flex p-1 space-x-1 bg-neutral-200 rounded-md">
                        {Object.keys(students).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'px-6 py-2.5 text-sm leading-5 font-bold rounded-md',
                                        'focus:outline-none',
                                        selected
                                            ? 'bg-white text-gray-700 shadow'
                                            : 'text-neutral-500 hover:bg-white/[0.45]'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(students).map((student, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'bg-white rounded-md p-3 shadow-md',
                                    'focus:outline-none',
                                    'pt-0 px-0'
                                )}
                            >
                                <table className="table shadow-none border-0">
                                    <thead>
                                        <tr>
                                            <th className="thead w-4">
                                                <input
                                                    name="select-all"
                                                    type="checkbox"
                                                    className="checkbox"
                                                    onChange={handleAllChecked}
                                                />
                                                <label
                                                    htmlFor="select-all"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </th>
                                            <th className="thead">Edit</th>
                                            <th className="thead">Name</th>
                                            <th className="thead">
                                                Categories
                                            </th>
                                            <th className="thead">
                                                Joining Date
                                            </th>
                                            <th className="thead">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!showLoader ? (
                                            student.length > 0 ? (
                                                student.map((std) => (
                                                    <tr>
                                                        <td className="p-4">
                                                            <div className="flex items-center">
                                                                <input
                                                                    name="select-one"
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                    checked={
                                                                        std.isChecked
                                                                    }
                                                                    value={
                                                                        std.id
                                                                    }
                                                                    onChange={
                                                                        handleCheckboxChange
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="p-4 w-3 text-gray-400 hover:text-blue-600">
                                                            <PencilIcon className="w-5 h-5 cursor-pointer" />
                                                        </td>
                                                        <Link
                                                            to={`/dashboard/students/view/${std.id}`}
                                                            state={{
                                                                student: std,
                                                            }}
                                                            className="group"
                                                        >
                                                            <td className="p-4 flex flex-col">
                                                                <span className="group-hover:text-sky-600">
                                                                    {
                                                                        std.first_name
                                                                    }{' '}
                                                                    {
                                                                        std.last_name
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-400 flex space-x-2 items-center ">
                                                                    <MailIcon className="w-4 h-4" />
                                                                    <span>
                                                                        {
                                                                            std.email
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </Link>
                                                        <td className="p-4">
                                                            {std.categories.map(
                                                                (cat) => (
                                                                    <Badge
                                                                        color="gray"
                                                                        message={
                                                                            cat.name
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </td>
                                                        <td className="p-4">
                                                            {moment(
                                                                std.created_at
                                                            ).format('LL')}
                                                        </td>
                                                        <td className="p-4 w-4">
                                                            <span className="flex space-x-1">
                                                                {std.status ===
                                                                    0 && (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-success btn-sm"
                                                                            onClick={() =>
                                                                                handleThumbsUp(
                                                                                    std.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <ThumbUpIcon className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={() =>
                                                                                rejectStudent(
                                                                                    std.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <ThumbDownIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {std.status ===
                                                                    1 && (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-info btn-sm"
                                                                            onClick={() =>
                                                                                triggerModal(
                                                                                    'category',
                                                                                    std.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <FolderIcon className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-primary btn-sm"
                                                                            onClick={() =>
                                                                                triggerModal(
                                                                                    'class',
                                                                                    std.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <UserGroupIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {std.status ===
                                                                    2 && (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-success btn-sm"
                                                                            onClick={() =>
                                                                                handleThumbsUp(
                                                                                    std.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <UserGroupIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={6}
                                                        className="p-4 pb-0"
                                                    >
                                                        <Placeholder
                                                            message={
                                                                'No students to list'
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            [...Array(8)].map((key) => (
                                                <tr key={key}>
                                                    {[...Array(5)].map(
                                                        (key) => (
                                                            <td
                                                                className="p-4"
                                                                key={key}
                                                            >
                                                                <LoadingPlaceholder />
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {openCatModal && (
                <Modal setOpenModal={setOpenCatModal}>
                    <AddCategoryDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        onClick={addToCategory}
                    />
                </Modal>
            )}
            {openClassModal && (
                <Modal setOpenModal={setOpenClassModal}>
                    <AddClassDropdown
                        classes={classes}
                        selectedClass={selectedClass}
                        setSelectedClass={setSelectedClass}
                        onClick={addToClass}
                    />
                </Modal>
            )}
            {openFeeModal && (
                <Modal setOpenModal={setOpenFeeModal}>
                    <SetStudentFee
                        id={targetStudent}
                        callback={fetchStudents}
                        setOpenFeeModal={setOpenFeeModal}
                    />
                </Modal>
            )}
        </div>
    )
}

export default ListStudents
