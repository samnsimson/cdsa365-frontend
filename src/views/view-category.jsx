import { EyeIcon, PencilIcon, RefreshIcon, XIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Badge from '../components/badge'
import Card from '../components/card'
import Loader from '../components/loader'
import { config } from '../config/config'

const ViewCategory = () => {
    const { entity, cat_id } = useParams()
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [currentlyRemoving, setCurrentlyRemoving] = useState(null)

    const ActionButtons = (
        removeFromCat,
        entity,
        cat_id,
        data,
        currentlyRemoving
    ) => {
        return (
            <div
                className="cursor-pointer group flex items-center"
                onClick={() => removeFromCat(entity, cat_id, data?.id)}
            >
                <Badge
                    color="red"
                    message="Remove"
                    className="group-hover:scale-110 inline"
                />
                <Loader loading={currentlyRemoving === data?.id} />
            </div>
        )
    }

    const fetchCategoryData = (entity, cat_id) => {
        axios
            .get(config.api.getCategoryData + `/${entity}/${cat_id}`)
            .then(({ data }) => {
                console.log('RECEIVED', data)
                setCategory(data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const updateCategory = (entity, cat_id) => {
        setUpdating(true)
        axios
            .put(config.api.updateCategory + `/${entity}/${cat_id}`, formData)
            .then(() => fetchCategoryData(entity, cat_id))
            .catch(() =>
                setError('Unable to update category. Please try again')
            )
            .finally(() => {
                setEdit(false)
                setUpdating(false)
            })
    }

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const removeFromCat = async (entity, cat_id, entity_id) => {
        setCurrentlyRemoving(entity_id)
        try {
            const baseUrl = config.api.removeEntityFromCategory
            const params = `/${entity}/${cat_id}/${entity_id}`
            const url = baseUrl + params
            await axios.get(url)
            const index = category[entity].findIndex((e) => e.id === entity_id)
            category[entity].splice(index, 1)
            setCategory(category)
        } catch (error) {
            console.log(error)
        } finally {
            setCurrentlyRemoving(null)
        }
    }

    useEffect(() => {
        fetchCategoryData(entity, cat_id)
    }, [entity, cat_id])

    useEffect(() => {
        if (Object.keys(category).length) {
            setFormData({
                name: category.name,
                description: category.description,
            })
        }
    }, [category])

    useEffect(() => {
        if (edit && error) setError(null)
    }, [edit])

    return (
        <div className="px-6 py-4 space-y-6">
            <Card title={'Category'}>
                <table className="table border-0 shadow-none w-full">
                    <tbody>
                        <tr>
                            <td className="p-4 font-bold w-1/5">Name</td>
                            <td className="p-4 flex items-center w-4/5">
                                {edit ? (
                                    <input
                                        name="name"
                                        value={formData.name || ''}
                                        className="form-control-sm w-full"
                                        onChange={handleChange}
                                    />
                                ) : (
                                    category?.name || (
                                        <Loader loading={loading} />
                                    )
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold w-1/5">Description</td>
                            <td className="p-4 flex items-center w-4/5">
                                {edit ? (
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        className="form-control-sm w-full"
                                        onChange={handleChange}
                                    />
                                ) : (
                                    category?.description || (
                                        <Loader loading={loading} />
                                    )
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="px-4 flex space-x-4 items-center">
                                <button
                                    className="btn-sm btn-primary"
                                    onClick={() => setEdit(!edit)}
                                >
                                    {edit ? (
                                        <>
                                            <XIcon
                                                className="w-4 h-4 mr-1 text-white"
                                                fill="currentColor"
                                            />
                                            Close
                                        </>
                                    ) : (
                                        <>
                                            <PencilIcon
                                                className="w-4 h-4 mr-1 text-white"
                                                fill="currentColor"
                                            />
                                            Edit
                                        </>
                                    )}
                                </button>
                                {edit && (
                                    <button
                                        className="btn-sm btn-info text-white"
                                        onClick={() =>
                                            updateCategory(entity, cat_id)
                                        }
                                    >
                                        <RefreshIcon
                                            className="w-4 h-4 mr-1 text-white"
                                            fill="currentColor"
                                        />
                                        Update
                                    </button>
                                )}
                                <Loader loading={updating} />
                                {error && (
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <Card title={`${entity} in Category`} bodyClass="p-0">
                <table className="table border-0 shadow-none">
                    <thead>
                        {entity === 'class' ? (
                            <tr>
                                <th className="thead">ID</th>
                                <th className="thead">Title</th>
                                <th className="thead">Progress state</th>
                                <th className="thead">Status</th>
                                <th className="thead">Action</th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="thead">ID</th>
                                <th className="thead">Name</th>
                                <th className="thead">Email</th>
                                <th className="thead">Phone</th>
                                <th className="thead">Action</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {category[entity] &&
                            category[entity].length > 0 &&
                            category[entity].map((data, key) =>
                                entity === 'class' ? (
                                    <tr key={key}>
                                        <td className="p-4">{data?.id}</td>
                                        <td className="p-4">{data?.title}</td>
                                        <td className="p-4">
                                            {data?.progress_state}
                                        </td>
                                        <td className="p-4">{data?.status}</td>
                                        <td className="p-4 flex items-center space-x-2 text-sm w-4">
                                            {ActionButtons(
                                                removeFromCat,
                                                entity,
                                                cat_id,
                                                data,
                                                currentlyRemoving
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="p-4">{data?.id}</td>
                                        <td className="p-4">{data?.name}</td>
                                        <td className="p-4">{data?.email}</td>
                                        <td className="p-4">{data?.phone}</td>
                                        <td className="p-4 flex items-center space-x-2 text-sm w-4">
                                            {ActionButtons(
                                                removeFromCat,
                                                entity,
                                                cat_id,
                                                data,
                                                currentlyRemoving
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default ViewCategory
