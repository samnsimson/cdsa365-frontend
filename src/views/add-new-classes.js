import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { config } from '../config/config'
import moment from 'moment'
import { LightningBoltIcon, SaveIcon } from '@heroicons/react/solid'
import Placeholder from '../components/placeholder'

const AddNewClasses = () => {
    const [trainers, setTrainers] = useState([])
    const [formData, setFormData] = useState({})
    const [categories, setCategories] = useState([])

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const getTrainerName = (id) => {
        const trainer = trainers.find((t) => +t.id === +id)
        return trainer ? trainer.first_name + ' ' + trainer.last_name : ''
    }

    const getCategoryName = (id) => {
        const category = categories.find((c) => +c.id === +id)
        return category ? category.name : ''
    }

    const createClass = () => {
        const data = { ...formData, status: 1 }
        axios
            .post(config.api.createClass, data)
            .then(({ data }) => setFormData({}))
            .catch((err) => console.log(err))
    }

    const publishLater = () => {
        const data = { ...formData, status: 0 }
        axios
            .post(config.api.createClass, data)
            .then(({ data }) => setFormData({}))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios
            .get(config.api.fetchTrainers)
            .then(({ data }) => setTrainers(data))
        axios
            .get(`${config.api.getCategory}/class`)
            .then(({ data }) => setCategories(data))
    }, [])

    return (
        <div className="px-6 py-4">
            <div className="flex space-x-6">
                <div className="w-2/3">
                    <div className="flex w-full py-4">
                        <h4 className="font-semibold text-gray-500">
                            Add new class
                        </h4>
                    </div>
                    <div className="card space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Class Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Eg:- Computer Science"
                                value={formData.title ?? ''}
                                onChange={handleChange}
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Enter the title of the class
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Class Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                className="form-control"
                                placeholder="Categroy description."
                                value={formData.description ?? ''}
                                onChange={handleChange}
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Enter a description for the class
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Start Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Choose start time for the class
                                </p>
                            </div>
                            <div className="w-1/2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    End Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Choose end time for the class
                                </p>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Choose Trainer
                            </label>
                            <select
                                className="form-control"
                                name="trainer"
                                onChange={handleChange}
                            >
                                <option value={null}>Select trainer</option>
                                {trainers.map((trainer) => (
                                    <option value={trainer.id}>
                                        {trainer.first_name +
                                            ' ' +
                                            trainer.last_name}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Assign a trainer to the class. If no trainers
                                listed, please create a trainer{' '}
                                <Link
                                    to="/dashboard/trainers/add-new"
                                    className="underline text-blue-500"
                                >
                                    here
                                </Link>
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Choose Class Category
                            </label>
                            <select
                                className="form-control"
                                name="category"
                                onChange={handleChange}
                            >
                                <option value={null}>Select category</option>
                                {categories.map((cat) => (
                                    <option value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Assign this class to category. If no categories
                                listed, please create a category{' '}
                                <Link
                                    to="/dashboard/category/class"
                                    className="underline text-blue-500"
                                >
                                    here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="flex w-full py-4">
                        <h4 className="font-semibold text-gray-500">Preview</h4>
                    </div>
                    <div className="card">
                        {Object.keys(formData).length > 0 ? (
                            <div className="flex flex-col space-y-6">
                                {formData.title && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Title
                                        </h4>
                                        <p className="font-bold">
                                            {formData.title}
                                        </p>
                                    </div>
                                )}
                                {formData.description && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Description
                                        </h4>
                                        <p className="font-normal">
                                            {formData.description}
                                        </p>
                                    </div>
                                )}
                                {formData.start && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Start Time
                                        </h4>
                                        <p className="font-normal">
                                            {moment(formData.start).format(
                                                'LLLL'
                                            )}
                                        </p>
                                    </div>
                                )}
                                {formData.end && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            End Time
                                        </h4>
                                        <p className="font-normal">
                                            {moment(formData.end).format(
                                                'LLLL'
                                            )}
                                        </p>
                                    </div>
                                )}
                                {formData.trainer && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Assigned To
                                        </h4>
                                        <p className="font-normal">
                                            {getTrainerName(formData.trainer)}
                                        </p>
                                    </div>
                                )}
                                {formData.category && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Category
                                        </h4>
                                        <p className="font-normal">
                                            {getCategoryName(formData.category)}
                                        </p>
                                    </div>
                                )}
                                {formData.title &&
                                    formData.description &&
                                    formData.start &&
                                    formData.end &&
                                    formData.trainer && (
                                        <div className="space-y-4">
                                            <button
                                                className="btn btn-danger w-full"
                                                onClick={createClass}
                                            >
                                                <LightningBoltIcon className="w-5 h-5 mr-2" />
                                                Publish class
                                            </button>
                                            <button
                                                className="btn btn-gray w-full"
                                                onClick={publishLater}
                                            >
                                                <SaveIcon className="w-5 h-5 mr-2" />{' '}
                                                Save and publish later
                                            </button>
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <Placeholder message="Enter class details to preview" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewClasses
