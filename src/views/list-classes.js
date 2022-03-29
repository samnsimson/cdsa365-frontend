import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Badge from '../components/badge'
import { config } from '../config/config'
import moment from 'moment-timezone'
import {
    EyeOffIcon,
    FolderAddIcon,
    LightningBoltIcon,
    TrashIcon,
} from '@heroicons/react/solid'
import AddCategoryDropdown from '../components/add-category-dropdown'
import Modal from '../components/modal'
import { Link } from 'react-router-dom'

const ListClasses = () => {
    const [classes, setClasses] = useState([])
    const [showActionButton, setShowActionButton] = useState(false)
    const [selectedClasses, setSelectedClasses] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const defaultCategory = { name: 'Select a category', disabled: true }
    const [categories, setCategories] = useState([defaultCategory])
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const updateClassStatus = (id, status) => {
        const url = config.api.updateClass + `/${id}`
        axios.put(url, { status: status }).then(() => fetchClasses())
    }

    const fetchClasses = () => {
        axios
            .get(config.api.fetchAllClasses)
            .then(({ data }) => {
                data.map((d) => (d.isChecked = false))
                setClasses(data)
            })
            .catch((err) => console.log(err))
    }

    const fetchCategories = () => {
        const url = config.api.getCategory + '/class'
        axios
            .get(url)
            .then(({ data }) => setCategories((state) => [...state, ...data]))
            .catch((err) => console.log(err))
    }

    const addToCategory = () => {
        const url = config.api.addUserToCategory + '/class'
        axios
            .post(url, {
                cat_id: selectedCategory.id,
                user_list: selectedClasses.map((o) => o.id),
            })
            .then(({ data }) => fetchClasses())
            .catch((error) => console.log(error))
    }

    const deleteClass = (id) => {
        if (typeof id === 'number' || typeof id === 'string') {
            id = [id]
        }
        console.log(id)
        axios
            .delete(config.api.deleteClass, { data: id })
            .then(() => fetchClasses())
            .catch((err) => console.log(err))
    }

    const handleAllChecked = (e) => {
        const classesCheckbox = classes
        classesCheckbox.forEach((o) => (o.isChecked = e.target.checked))
        setClasses([...classesCheckbox])
    }

    const handleCheckboxChange = (e) => {
        const classesCheckbox = classes
        classesCheckbox.forEach((o) => {
            if (+o.id === +e.target.value) {
                o.isChecked = e.target.checked
            }
        })
        setClasses([...classesCheckbox])
    }

    const triggerModal = () => {
        const selected = classes.filter((o) => o.isChecked)
        setSelectedClasses(selected)
        setOpenModal(true)
    }

    const bulkDeleteClasses = () => {
        const selected = classes.filter((c) => c.isChecked).map((o) => o.id)
        deleteClass(selected)
    }

    useEffect(() => {
        fetchClasses()
        fetchCategories()
        return () => setCategories([])
    }, [])

    useEffect(() => {
        console.log(classes)
        const checkedCount = classes.filter((o) => o.isChecked)
        setShowActionButton(checkedCount.length > 0)
        if (openModal) setOpenModal(false)
    }, [classes])

    return (
        <div className="px-6 py-4">
            <div className="flex w-full justify-between py-4">
                <h4 className="font-semibold text-gray-500">All Classes</h4>
                <div className="action-section flex justify-end space-x-2">
                    {showActionButton && (
                        <>
                            <button
                                type="button"
                                className="btn-sm btn-gray"
                                onClick={triggerModal}
                            >
                                <FolderAddIcon className="w-4 h-4 mr-2" />
                                Add category
                            </button>
                            <button
                                type="button"
                                className="btn-sm btn-gray"
                                onClick={bulkDeleteClasses}
                            >
                                <TrashIcon
                                    className="w-4 h-4 mr-2 text-red-500"
                                    fill="currentColor"
                                />
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full">
                <div className="table-card">
                    <table className="items-center w-full bg-transparent border-collapse border-1 shadow-sm">
                        <thead>
                            <th className="thead w-4">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    name="sellect-all"
                                    onChange={handleAllChecked}
                                />
                            </th>
                            <th className="thead">Title</th>
                            <th className="thead">Trainer</th>
                            <th className="thead">Date</th>
                            <th className="thead">Time</th>
                            <th className="thead">Status</th>
                            <th className="thead">Action</th>
                        </thead>
                        <tbody>
                            {classes.map((c, key) => (
                                <tr key={key}>
                                    <td className="p-4 w-4">
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            name="sellect-class"
                                            value={c.id}
                                            checked={c.isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </td>
                                    <Link
                                        to={`/dashboard/classes/edit/${c.id}`}
                                        state={{ class: c }}
                                    >
                                        <td className="p-4 w-1/2 space-y-2">
                                            <p className="text-slate-700">
                                                {c.title}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {c.categories.map((cat) => (
                                                    <Badge
                                                        color="sky"
                                                        message={cat.name}
                                                    />
                                                ))}
                                            </p>
                                        </td>
                                    </Link>
                                    <td className="p-4">
                                        <Link
                                            to={`/dashboard/trainers/view/${c.trainer_id}`}
                                            className="hover:text-sky-500"
                                        >
                                            {c.trainer_name}
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        {moment(c.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LL')}
                                    </td>
                                    <td className="p-4">
                                        {moment(c.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LT') +
                                            ' - ' +
                                            moment(c.end_time)
                                                .tz('Asia/Kolkata')
                                                .format('LT')}
                                    </td>
                                    <td className="p-4">
                                        {
                                            <Badge
                                                color={
                                                    c.status
                                                        ? 'green'
                                                        : 'yellow'
                                                }
                                                message={
                                                    c.status
                                                        ? 'Published'
                                                        : 'Draft'
                                                }
                                            />
                                        }
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end space-x-4">
                                            {!c.status ? (
                                                <LightningBoltIcon
                                                    className="h-5 w-5 text-teal-500 hover:cursor-pointer"
                                                    fill="currentColor"
                                                    onClick={() =>
                                                        updateClassStatus(
                                                            c.id,
                                                            1
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EyeOffIcon
                                                    className="h-5 w-5 text-sky-500 hover:cursor-pointer"
                                                    fill="currentColor"
                                                    onClick={() =>
                                                        updateClassStatus(
                                                            c.id,
                                                            0
                                                        )
                                                    }
                                                />
                                            )}
                                            <TrashIcon
                                                className="h-5 w-5 text-red-500 hover:cursor-pointer"
                                                fill="currentColor"
                                                onClick={() =>
                                                    deleteClass(c.id)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openModal && (
                <Modal setOpenModel={setOpenModal}>
                    <AddCategoryDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        onClick={addToCategory}
                    />
                </Modal>
            )}
        </div>
    )
}

export default ListClasses
