import { PlusCircleIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { config } from '../config/config'

const Category = () => {
    const { entity } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [categories, setCategories] = useState([])

    const handleOnChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        try {
            const url = config.api.createCategory
            const { data } = await axios.post(url, { ...formData, entity })
            if (data) fetchCategories()
        } catch (error) {
            console.log(error)
        } finally {
            setFormData({})
        }
    }

    const fetchCategories = () => {
        const url = config.api.getCategory + `/${entity}`
        axios
            .get(url)
            .then(({ data }) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }

    const deleteCategory = async (entity, cat_id) => {
        try {
            const url = config.api.deleteCategory + `/${entity}/${cat_id}/`
            await axios.delete(url)
            fetchCategories()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setFormData({})
        const allowedCategory = ['trainer', 'student', 'class']
        if (!allowedCategory.includes(entity)) {
            navigate('/page-not-found', { replace: true })
        }
        fetchCategories()
    }, [, entity])

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
                    <span className="capitalize">{entity}</span> Category{' '}
                    <span className="text-xs font-normal ml-2">
                        - Create category for {entity}
                    </span>
                </h4>
            </div>
            <div className="md:flex w-full md:space-x-6">
                <div className="md:w-1/2 w-full">
                    <div className="card space-y-6">
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
                                Enter category description. The description is
                                not prominent by default; however, some pages
                                may show it.
                            </p>
                        </div>
                        <div>
                            <button
                                className="btn btn-info"
                                onClick={handleSubmit}
                                disabled={buttonDisabled}
                            >
                                <PlusCircleIcon className="h-5 w-5 mr-2" /> Add
                                new category
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="table-card">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="thead">ID</th>
                                    <th className="thead">Category Name</th>
                                    <th className="thead">Count</th>
                                    <th className="thead">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, key) => (
                                    <tr key={key} className="table-hover">
                                        <td className="p-4 w-4">{key + 1}</td>
                                        <td className="p-4">
                                            <Link
                                                to={`/dashboard/category/${entity}/view/${category.id}`}
                                                className="hover:text-sky-500"
                                            >
                                                <p>{category.name}</p>
                                                <div className="font-normal text-xs text-gray-400">
                                                    {category.description}
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4 w-4 text-center">
                                            {category.count}
                                        </td>
                                        <td className="p-4 w-4 text-center">
                                            <div className="flex space-x-3">
                                                <TrashIcon
                                                    className="text-red-400 cursor-pointer w-5 h-5 hover:scale-110 hover:text-red-600"
                                                    fill="currentColor"
                                                    onClick={() =>
                                                        deleteCategory(
                                                            entity,
                                                            category.id
                                                        )
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
            </div>
        </div>
    )
}

export default Category
