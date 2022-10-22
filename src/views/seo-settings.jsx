import axios from 'axios'
import { Button, Tabs, TextInput } from 'flowbite-react'
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
]

const SeoForm = ({ records, page, fetchSeoRecords }) => {
    const [seoData, setSeoData] = useState(null)
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

    const updateSeo = () => {
        const data = { ...formData, page }
        axios
            .post(config.api.createSeoConfig, data)
            .then(() => fetchSeoRecords())
            .catch((err) => console.log(err))
            .finally(() => setCanEdit(!canEdit))
    }

    useEffect(() => {
        setSeoData(records.find((x) => x.page === page))
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
            <div>
                {canEdit ? (
                    <div className="flex gap-3">
                        <Button onClick={updateSeo}>Publish</Button>
                        <Button
                            color="light"
                            onClick={() => setCanEdit(!canEdit)}
                        >
                            <span className="text-red-500">Cancel</span>
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setCanEdit(!canEdit)}>Edit</Button>
                )}
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
