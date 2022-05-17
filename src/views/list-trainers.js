import { TrashIcon, UserGroupIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryDropdown from '../components/add-category-dropdown'
import Badge from '../components/badge'
import Modal from '../components/modal'
import ProfilePicture from '../components/profile-picture'
import { config } from '../config/config'

const ListTrainers = () => {
    const [trainers, setTrainers] = useState([])
    const [showActions, setShowActions] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [slectedUsers, setSlectedUsers] = useState([])
    const defaultCategory = { name: 'Select a category', disabled: true }
    const [categories, setCategories] = useState([defaultCategory])
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const fetchAllTrainers = () => {
        axios
            .get(config.api.fetchAllTrainers)
            .then(({ data }) => {
                if (data) {
                    data.map((d) => (d.isChecked = false))
                    setTrainers(data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCategories = async () => {
        try {
            const url = config.api.getCategory + '/trainer'
            const { data } = await axios.get(url)
            if (data.length) setCategories((state) => [...state, ...data])
        } catch (error) {
            console.log(error)
        }
    }

    const addToCategory = async () => {
        try {
            const url = config.api.addUserToCategory + '/trainer'
            const { data } = await axios.post(url, {
                cat_id: selectedCategory.id,
                user_list: slectedUsers.map((user) => user.id),
            })
            if (data) fetchAllTrainers()
        } catch (error) {}
    }

    const handleAllChecked = (e) => {
        const trainersCheckbox = trainers
        trainersCheckbox.forEach((o) => (o.isChecked = e.target.checked))
        setTrainers([...trainersCheckbox])
    }

    const handleCheckboxChange = (e) => {
        const trainersCheckbox = trainers
        trainersCheckbox.forEach((o) => {
            if (+o.id === +e.target.value) {
                o.isChecked = e.target.checked
            }
        })
        setTrainers([...trainersCheckbox])
    }

    const triggerModal = async () => {
        const usersToAdd = trainers.filter((u) => u.isChecked)
        setSlectedUsers(usersToAdd)
        setOpenModal(true)
    }

    useEffect(() => {
        fetchAllTrainers()
        fetchCategories()
    }, [])

    useEffect(() => {
        console.log(trainers)
        const checkedItem = trainers.filter((t) => t.isChecked)
        setShowActions(checkedItem.length > 0)
        if (openModal) setOpenModal(false)
    }, [trainers])

    return (
        <div className="py-4 px-6">
            <div className="py-4 w-full flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-gray-500">
                        All trainers
                    </h4>
                </div>
                {showActions && (
                    <div className="inline-flex space-x-2" role="group">
                        <button
                            type="button"
                            className="btn-sm btn-gray"
                            onClick={triggerModal}
                        >
                            <UserGroupIcon
                                className="w-3 h-3 mr-2 text-cyan-500"
                                fill="currentColor"
                            />
                            Add Category
                        </button>
                        <button type="button" className="btn-sm btn-gray">
                            <TrashIcon
                                className="w-3 h-3 mr-2 text-red-500"
                                fill="currentColor"
                            />
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full max-h-[75vh] table-card overflow-y-scroll">
                <table className="items-center w-full bg-transparent border-collapse border-1 shadow-sm">
                    <thead>
                        <tr>
                            <th className="thead">
                                <input
                                    id="checkbox-table-1"
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={handleAllChecked}
                                />
                                <label
                                    for="checkbox-table-1"
                                    className="sr-only"
                                >
                                    checkbox
                                </label>
                            </th>
                            <th className="thead">Name</th>
                            <th className="thead">Category</th>
                            <th className="thead">Status</th>
                            <th className="thead">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, key) => (
                            <tr key={key} className="table-hover group">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        <input
                                            name="checkbox"
                                            type="checkbox"
                                            className="checkbox"
                                            checked={trainer.isChecked}
                                            value={trainer.id}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Link
                                        to={`/dashboard/trainers/view/${trainer.id}`}
                                    >
                                        <span className="flex">
                                            <ProfilePicture
                                                name={
                                                    trainer.first_name +
                                                    ' ' +
                                                    trainer.last_name
                                                }
                                            />
                                            <div className="ml-3 overflow-hidden">
                                                <p className="text-sm font-medium text-slate-900 group-hover:text-sky-500">
                                                    {trainer.first_name}{' '}
                                                    {trainer.last_name}
                                                </p>
                                                <p className="text-sm text-slate-500 truncate">
                                                    {trainer.email}
                                                </p>
                                            </div>
                                        </span>
                                    </Link>
                                </td>
                                <td className="p-4">
                                    {trainer.categories
                                        .slice(0, 2)
                                        .map((category, key) => (
                                            <Badge
                                                key={key}
                                                color="gray"
                                                message={category.name}
                                            />
                                        ))}
                                    {trainer.categories.length > 2 && (
                                        <Badge
                                            color="gray"
                                            message={`+${
                                                trainer.categories.length - 1
                                            }`}
                                        />
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-start">
                                        {trainer.invite_status === 1 &&
                                            trainer.status === 0 && (
                                                <Badge
                                                    color="yellow"
                                                    message="Invite sent"
                                                />
                                            )}
                                        {trainer.status === 0 ? (
                                            <Badge
                                                color="red"
                                                message="Inactive"
                                            />
                                        ) : (
                                            <Badge
                                                color="green"
                                                message="Active"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center">
                                        <TrashIcon className="h-5 w-5 text-red-400" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openModal && (
                <Modal setOpenModal={setOpenModal}>
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

export default ListTrainers
