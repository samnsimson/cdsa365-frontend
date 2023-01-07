import { CheckIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Alert, Button, Tabs, TextInput } from 'flowbite-react'
import { startCase } from 'lodash'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const tabs = [
    {
        url: 'home',
        name: 'Home',
    },
    {
        url: 'about-us',
        name: 'About Us',
    },
    {
        url: 'courses',
        name: 'Courses',
    },
    {
        url: 'kids',
        name: 'Kids',
    },
    {
        url: 'adults',
        name: 'Adults',
    },
    {
        url: 'contact-us',
        name: 'Contact Us',
    },
    {
        url: 'privacy-policy',
        name: 'Privacy Policy',
    },
    {
        url: 'terms-and-conditions',
        name: 'Terms & Conditions',
    },
    {
        url: 'enroll',
        name: 'Enroll',
    },
    {
        url: 'request-a-demo',
        name: 'Request a Demo',
    },
    {
        url: 'public-speaking-for-kids',
        name: 'Public Speaking for Kids',
    },
    {
        url: 'public-speaking-for-adults',
        name: 'Public Speaking for Adults',
    },
]

const ImageComponent = ({ record }) => {
    const [canEdit, setCanEdit] = useState(false)
    const [alert, setAlert] = useState(null)
    const [formData, setFormData] = useState({
        title: record?.title || '',
        alt: record?.alt || '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((state) => ({ ...state, [name]: value }))
    }

    const handleCancel = () => {
        setCanEdit(false)
        setFormData((state) => ({ ...state, ...record }))
    }

    const publish = (id) => {
        const url = config.api.updateImageMeta + `/${id}`
        axios
            .put(url, formData)
            .then((data) => {
                setFormData((state) => ({ ...state, ...data }))
                setAlert({ type: 'success', message: 'Meta data updated' })
            })
            .catch((err) => {
                setFormData((state) => ({ ...state, ...record }))
                setAlert({ type: 'error', message: err.response.data.message })
            })
            .finally(() => setCanEdit(false))
    }

    useEffect(() => {
        if (!null) {
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])

    return (
        <div className="w-full flex gap-6 p-4">
            <section className="w-2/12">
                <img
                    src={record.url}
                    alt="index page image"
                    className="rounded w-full h-[150px] object-cover"
                />
            </section>
            <section className="w-10/12 flex flex-col gap-4">
                <TextInput
                    id="seoImageTitle"
                    type="text"
                    placeholder={`Enter Title for image`}
                    required={true}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!canEdit}
                />
                <TextInput
                    id="seoImageAlt"
                    type="text"
                    placeholder={`Enter Alternate Keyword for image`}
                    required={true}
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
                    disabled={!canEdit}
                />
                <section className="flex gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                        {canEdit ? (
                            <div className="flex gap-4">
                                <Button
                                    size="sm"
                                    onClick={() => publish(record.id)}
                                >
                                    Publish
                                </Button>
                                <Button
                                    size="sm"
                                    color="light"
                                    onClick={handleCancel}
                                >
                                    <span className="text-red-500">Cancel</span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setCanEdit(!canEdit)}
                                size="sm"
                            >
                                Edit
                            </Button>
                        )}
                        {alert && (
                            <Alert
                                color={
                                    alert?.type === 'error'
                                        ? 'failure'
                                        : 'success'
                                }
                                icon={CheckIcon}
                            >
                                {alert.message}
                            </Alert>
                        )}
                    </div>
                    <div className="p-2 bg-slate-100 rounded border-1 border-dashed text-xs">
                        <p>
                            <span className="font-bold text-slate-500">
                                Image ID:{' '}
                            </span>
                            <span className="text-slate-400">{record.id}</span>
                        </p>
                    </div>
                </section>
            </section>
        </div>
    )
}

const ImageSettings = ({ records }) => {
    return (
        <section className=" bg-white border-1 divide-y-1 grid grid-cols-1">
            {records.map((record, key) => (
                <ImageComponent record={record} key={key} />
            ))}
        </section>
    )
}

const SeoForm = ({ records, page, fetchSeoRecords }) => {
    const [alert, setAlert] = useState(null)
    const [seoData, setSeoData] = useState(null)
    const [imageRecords, setImageRecords] = useState([])
    const [canEdit, setCanEdit] = useState(false)
    const [formData, setFormData] = useState({
        title: seoData?.title || '',
        description: seoData?.description || '',
        keywords: seoData?.keywords || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((state) => ({ ...state, [name]: value }))
    }

    const handleCancel = () => {
        setFormData((state) => ({ ...state, ...seoData }))
        setCanEdit(!canEdit)
    }

    const updateSeo = () => {
        axios
            .post(config.api.createSeoConfig, { ...formData, page })
            .then(() => {
                setAlert({ type: 'success', message: 'Published SEO Data' })
                fetchSeoRecords()
            })
            .catch((err) =>
                setAlert({ type: 'error', message: err.response.data.message })
            )
            .finally(() => setCanEdit(!canEdit))
    }

    useEffect(() => {
        const result = records.find((x) => x.page === page)
        if (result) {
            const { title, description, keywords, images } = result
            setSeoData({ title, description, keywords })
            setImageRecords(images)
        } else {
            setSeoData({ title: '', description: '', keywords: '' })
            setImageRecords([])
        }
    }, [records, page])

    useEffect(() => {
        if (seoData) {
            setFormData({
                title: seoData.title,
                description: seoData.description,
                keywords: seoData.keywords,
            })
        }
    }, [seoData])

    useEffect(() => {
        if (!null) {
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])

    return (
        <div className="mb-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">SEO Title</p>
                <TextInput
                    id="seoTitle"
                    type="text"
                    placeholder={`Enter SEO Title for "${page
                        .split('-')
                        .map((x) => startCase(x))
                        .join(' ')}"`}
                    required={true}
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    disabled={!canEdit}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">SEO Description</p>
                <TextInput
                    id="seoDescription"
                    type="text"
                    placeholder={`Enter SEO description for "${page
                        .split('-')
                        .map((x) => startCase(x))
                        .join(' ')}"`}
                    required={true}
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    disabled={!canEdit}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">SEO Keywords</p>
                <TextInput
                    id="seoKeyword"
                    type="text"
                    placeholder={`Enter SEO keywords for "${page
                        .split('-')
                        .map((x) => startCase(x))
                        .join(' ')}"`}
                    required={true}
                    name="keywords"
                    value={formData.keywords || ''}
                    onChange={handleChange}
                    disabled={!canEdit}
                />
            </div>
            <div className="flex gap-6 items-center">
                {canEdit ? (
                    <div className="flex gap-3">
                        <Button onClick={updateSeo}>Publish</Button>
                        <Button
                            color="light"
                            onClick={() => setCanEdit(!canEdit)}
                        >
                            <span
                                className="text-red-500"
                                onClick={handleCancel}
                            >
                                Cancel
                            </span>
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setCanEdit(!canEdit)}>Edit</Button>
                )}
                {alert && (
                    <Alert
                        color={alert?.type === 'error' ? 'failure' : 'success'}
                        icon={CheckIcon}
                    >
                        {alert.message}
                    </Alert>
                )}
            </div>
            <hr />
            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">Image Settings</p>
                <ImageSettings records={imageRecords} canEdit={canEdit} />
            </div>
        </div>
    )
}

const SEOSettings = () => {
    const [seoRecords, setSeoRecords] = useState([])

    const fetchSeoRecords = () => {
        axios
            .get(config.api.readAllSeoConfig)
            .then(({ data }) => setSeoRecords(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchSeoRecords()
    }, [])

    return (
        <div className="py-4 px-6">
            <div className="prose">
                <h4>SEO Settings</h4>
            </div>
            <div className="container w-full my-4">
                <Tabs.Group aria-label="SEO Tabs" style="underline">
                    {tabs.map((tab, key) => {
                        return (
                            <Tabs.Item title={tab.name} key={key}>
                                <SeoForm
                                    records={seoRecords}
                                    page={tab.url}
                                    fetchSeoRecords={fetchSeoRecords}
                                />
                            </Tabs.Item>
                        )
                    })}
                </Tabs.Group>
            </div>
        </div>
    )
}

export default SEOSettings
