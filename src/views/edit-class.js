import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { config } from '../config/config'
import moment from 'moment'
import { LightningBoltIcon } from '@heroicons/react/solid'
import Placeholder from '../components/placeholder'
import Badge from '../components/badge'

const EditClass = () => {
    const { state, pathname } = useLocation()
    console.log(state.class)
    const [trainers, setTrainers] = useState([])
    const [categories, setCategories] = useState([])
    const [showButton, setShowButton] = useState(false)
    const [formData, setFormData] = useState(() => {
        if (!state) {
            return {}
        } else {
            let timeFormat = 'yyyy-MM-DDTHH:mm'
            return {
                id: state.class.id,
                title: state.class.title,
                description: state.class.description,
                type: state.class.type,
                start: moment(state.class.start_time).format(timeFormat),
                end: moment(state.class.end_time).format(timeFormat),
                video_link: state.class.video_link,
                trainer: state.class.trainer_id,
                categories: state.class.categories,
            }
        }
    })

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

    const updateClass = (id) => {
        const data = { ...formData }
        delete data.categories
        axios
            .put(config.api.updateClass + `/${id}`, data)
            .then(() => setShowButton(false))
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

    useEffect(() => {
        if (pathname.includes('add-new')) {
            setFormData({})
        }
    }, [pathname])

    useEffect(() => {
        console.log(formData)
        let videoLinkOk = false
        if (formData.type === 'video') {
            if (formData.video_link) videoLinkOk = true
        } else {
            videoLinkOk = true
        }
        if (
            formData.title &&
            formData.description &&
            formData.type &&
            formData.start &&
            formData.end &&
            formData.trainer &&
            videoLinkOk
        ) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }, [formData])

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
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Class Type
                                </label>
                                <select
                                    name="type"
                                    className="form-control"
                                    value={formData.type ?? 'phone'}
                                    onChange={handleChange}
                                >
                                    <option value="phone">Phone</option>
                                    <option value="video">Video</option>
                                </select>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Choose the type of class
                                </p>
                            </div>
                            <div className="w-1/2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Video Link
                                    </label>
                                    <input
                                        type="text"
                                        name="video_link"
                                        className="form-control"
                                        value={formData.video_link ?? ''}
                                        onChange={handleChange}
                                        disabled={formData.type !== 'video'}
                                    />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Enter link to the video
                                    </p>
                                </div>
                            </div>
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
                                    value={formData.start ?? '0000-00-00T00:00'}
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
                                    value={formData.end ?? '0000-00-00T00:00'}
                                    min={formData.start}
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
                                value={formData.trainer ?? null}
                                onChange={handleChange}
                            >
                                <option value={null}>Select trainer</option>
                                {trainers.map((trainer, i) => (
                                    <option value={trainer.id} key={i}>
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
                            <div className="flex mb-3">
                                {formData.categories.map((cat) => {
                                    return (
                                        <div className="p-1 px-2 bg-blue-100 text-blue-500 rounded-full text-xs">
                                            {cat.name}
                                        </div>
                                    )
                                })}
                            </div>
                            <select
                                className="form-control"
                                name="category"
                                onChange={handleChange}
                            >
                                <option value={null}>Select category</option>
                                {categories.map((cat, i) => (
                                    <option key={i} value={cat.id}>
                                        {cat.name}
                                    </option>
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
                                {formData.type && (
                                    <div>
                                        <h4 className="text-slate-500">
                                            Class Type{' '}
                                            <Badge
                                                color="red"
                                                message={formData.type}
                                                className="capitalize"
                                            />
                                        </h4>
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
                                {showButton && (
                                    <div className="space-y-4">
                                        <button
                                            className="btn btn-danger w-full"
                                            onClick={() =>
                                                updateClass(state.class.id)
                                            }
                                        >
                                            <LightningBoltIcon className="w-5 h-5 mr-2" />
                                            Publish class
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

export default EditClass
