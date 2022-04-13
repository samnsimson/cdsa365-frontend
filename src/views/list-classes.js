import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Badge from '../components/badge'
import { config } from '../config/config'
import moment from 'moment-timezone'
import {
    EyeOffIcon,
    FilterIcon,
    FolderAddIcon,
    LightningBoltIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/solid'
import AddCategoryDropdown from '../components/add-category-dropdown'
import Modal from '../components/modal'
import { Link } from 'react-router-dom'
import LoadingPlaceholder from '../components/loading-placeholder'

const ListClasses = () => {
    const [classes, setClasses] = useState([])
    const [cls, setCls] = useState(classes)
    const [showActionButton, setShowActionButton] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [titleToFilter, setTitleToFilter] = useState('')
    const [nameToFilter, setNameToFilter] = useState('')
    const [statusToFilter, setStatusToFilter] = useState('')
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
        const classesCheckbox = cls
        classesCheckbox.forEach((o) => (o.isChecked = e.target.checked))
        setClasses([...classesCheckbox])
    }

    const handleCheckboxChange = (e) => {
        const classesCheckbox = cls
        classesCheckbox.forEach((o) => {
            if (+o.id === +e.target.value) {
                o.isChecked = e.target.checked
            }
        })
        setClasses([...classesCheckbox])
    }

    const triggerModal = () => {
        const selected = cls.filter((o) => o.isChecked)
        setSelectedClasses(selected)
        setOpenModal(true)
    }

    const bulkDeleteClasses = () => {
        const selected = cls.filter((c) => c.isChecked).map((o) => o.id)
        deleteClass(selected)
    }

    const filterClassByTitle = (array, key) => {
        return key.length
            ? array.filter((item) =>
                  item.title.toLowerCase().includes(key.toLowerCase())
              )
            : array
    }

    const filterClassByName = (array, key) => {
        return key.length
            ? array.filter((item) =>
                  item.trainer_name.toLowerCase().includes(key.toLowerCase())
              )
            : array
    }

    const filterClassByStatus = (array, key) => {
        return key ? array.filter((item) => item.status === Number(key)) : array
    }

    const clearFilter = () => {
        setTitleToFilter('')
        setNameToFilter('')
        setStatusToFilter('')
    }

    useEffect(() => {
        fetchClasses()
        fetchCategories()
        return () => setCategories([])
    }, [])

    useEffect(() => {
        setCls(classes)
    }, [classes])

    useEffect(() => {
        const checkedCount = cls.filter((o) => o.isChecked)
        setShowActionButton(checkedCount.length > 0)
        if (openModal) setOpenModal(false)
    }, [cls])

    useEffect(() => {
        let classToFilter = classes
        classToFilter = filterClassByTitle(classToFilter, titleToFilter)
        classToFilter = filterClassByName(classToFilter, nameToFilter)
        classToFilter = filterClassByStatus(classToFilter, statusToFilter)
        setCls(classToFilter)
    }, [titleToFilter, nameToFilter, statusToFilter])

    useEffect(() => {
        if (!showFilter) {
            titleToFilter.length && setTitleToFilter('')
            nameToFilter.length && setNameToFilter('')
            statusToFilter.length && setStatusToFilter('')
        }
    }, [showFilter])

    return (
        <div className="px-6 py-4">
            <div className="flex w-full justify-between py-4">
                <h4 className="font-semibold text-gray-500">
                    All Classes ({cls.length})
                </h4>
                <div className="action-section flex justify-end space-x-2">
                    <button
                        className="btn-sm btn-gray text-blue-400"
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <FilterIcon className="w-4 h-4" fill="currentColor" />
                    </button>
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
                    <table className="items-center min-w-full bg-transparent border-collapse border-1 shadow-sm">
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
                            {showFilter && (
                                <tr className="border-b bg-gray-100">
                                    <td></td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            name="title"
                                            value={titleToFilter}
                                            className="form-control-sm"
                                            placeholder="Enter title to filter"
                                            onChange={(e) =>
                                                setTitleToFilter(e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            name="trainer_name"
                                            value={nameToFilter}
                                            className="form-control-sm"
                                            placeholder="Enter name to filter"
                                            onChange={(e) =>
                                                setNameToFilter(e.target.value)
                                            }
                                        />
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td className="p-4">
                                        <select
                                            name="status"
                                            value={statusToFilter}
                                            className="form-control-sm"
                                            onChange={(e) =>
                                                setStatusToFilter(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={''}>Select</option>
                                            <option value={0}>Draft</option>
                                            <option value={1}>Published</option>
                                        </select>
                                    </td>
                                    <td className="text-center text-sm text-red-400">
                                        <span
                                            onClick={clearFilter}
                                            className="cursor-pointer"
                                        >
                                            Clear filter
                                        </span>
                                    </td>
                                </tr>
                            )}
                            {cls.length > 0
                                ? cls.map((c, key) => (
                                      <tr
                                          key={key}
                                          className="transition-transform"
                                      >
                                          <td nowrap className="p-4 w-4">
                                              <input
                                                  className="checkbox"
                                                  type="checkbox"
                                                  name="sellect-class"
                                                  value={c.id}
                                                  checked={c.isChecked}
                                                  onChange={
                                                      handleCheckboxChange
                                                  }
                                              />
                                          </td>
                                          <Link
                                              to={`/dashboard/classes/view/${c.slug}`}
                                              state={{ class: c }}
                                          >
                                              <td
                                                  nowrap
                                                  className="p-4 w-1/2 space-y-2 text-truncate"
                                              >
                                                  <p className="text-slate-700">
                                                      {c.title}
                                                  </p>
                                                  <p className="text-xs text-slate-400">
                                                      {c.categories.map(
                                                          (cat) => (
                                                              <Badge
                                                                  color="sky"
                                                                  message={
                                                                      cat.name
                                                                  }
                                                              />
                                                          )
                                                      )}
                                                  </p>
                                              </td>
                                          </Link>
                                          <td nowrap className="p-4 text-sm">
                                              <Link
                                                  to={`/dashboard/trainers/view/${c.trainer_id}`}
                                                  className="hover:text-sky-500"
                                              >
                                                  {c.trainer_name}
                                              </Link>
                                          </td>
                                          <td nowrap className="p-4 text-sm">
                                              {moment(c.start_time)
                                                  .tz('Asia/Kolkata')
                                                  .format('LL')}
                                          </td>
                                          <td nowrap className="p-4 text-sm">
                                              {moment(c.start_time)
                                                  .tz('Asia/Kolkata')
                                                  .format('LT') +
                                                  ' - ' +
                                                  moment(c.end_time)
                                                      .tz('Asia/Kolkata')
                                                      .format('LT')}
                                          </td>
                                          <td nowrap className="p-4">
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
                                          <td nowrap className="p-4">
                                              <div className="flex justify-end space-x-4">
                                                  <Link
                                                      to={`/dashboard/classes/edit/${c.id}`}
                                                      state={{ class: c }}
                                                  >
                                                      <PencilIcon
                                                          className="h-5 w-5 cursor-pointer"
                                                          fill="currentColor"
                                                      />
                                                  </Link>
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
                                  ))
                                : [...Array(8)].map((key) => {
                                      return (
                                          <tr key={key}>
                                              {[...Array(7)].map((key) => (
                                                  <td key={key} className="p-4">
                                                      <LoadingPlaceholder />
                                                  </td>
                                              ))}
                                          </tr>
                                      )
                                  })}
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
