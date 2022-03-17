import { PlusCircleIcon } from '@heroicons/react/outline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from '../config/config'

const Category = () => {
    const { entity } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const handleOnChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        try {
            const url = config.api.createCategory
            const { data } = await axios.post(url, { ...formData, entity })
            if (data) console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setFormData({})
        }
    }

    useEffect(() => {
        setFormData({})
        const allowedCategory = ['trainer', 'student', 'class']
        if (!allowedCategory.includes(entity)) {
            navigate('/page-not-found', { replace: true })
        }
    }, [entity])

    useEffect(() => {
        if (formData?.name?.length && formData?.description?.length) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [formData])

    return (
        <div className="px-6 py-4">
            <div className="py-4 w-full flex justify-between">
                <h4 className="font-semibold text-gray-500">
                    <span className="capitalize">{entity}</span> Category
                </h4>
            </div>
            <div className="flex w-full space-x-6">
                <div className="card w-1/2 space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Eg:- Computer Science"
                            value={formData.name ?? ''}
                            onChange={handleOnChange}
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            The name is how it appears on your site.
                        </p>
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            className="form-control"
                            placeholder="Categroy description."
                            value={formData.description ?? ''}
                            onChange={handleOnChange}
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Enter category description. The description is not
                            prominent by default; however, some pages may show
                            it.
                        </p>
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="image"
                        >
                            Upload image
                        </label>
                        <input
                            className="form-control"
                            aria-describedby="image"
                            id="image"
                            name="image"
                            type="file"
                            value={formData.image ?? ''}
                            onChange={handleOnChange}
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Choose an image for the category
                        </p>
                    </div>
                    <div>
                        <button
                            className="btn btn-info"
                            onClick={handleSubmit}
                            disabled={buttonDisabled}
                        >
                            <PlusCircleIcon className="h-5 w-5 mr-2" /> Add new
                            category
                        </button>
                    </div>
                </div>
                <div className="card w-1/2"></div>
            </div>
        </div>
    )
}

export default Category
