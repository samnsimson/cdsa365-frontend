import {
    CodeIcon,
    DocumentTextIcon,
    MenuAlt2Icon,
    TrashIcon,
} from '@heroicons/react/solid'
import axios from 'axios'
import {
    Badge,
    Button,
    Label,
    Spinner,
    Table,
    Tabs,
    TextInput,
    ToggleSwitch,
    Tooltip,
} from 'flowbite-react'
import { capitalize, truncate } from 'lodash'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { config } from '../config/config'

const tabs = [
    {
        name: 'Title',
        icon: DocumentTextIcon,
    },
    {
        name: 'Description',
        icon: MenuAlt2Icon,
    },
    {
        name: 'Keywords',
        icon: CodeIcon,
    },
]

const TableComponent = ({ records, entity, className, callback }) => {
    const [activeRecord, setActiveRecord] = useState(null)
    const currentRecord = useMemo(
        () => records.filter((x) => x.type === entity),
        [records]
    )

    const activateSeo = (data) => {
        axios
            .put(config.api.activateSeo, data)
            .then(console.log)
            .catch((err) => console.log(err))
    }

    const handleOnChange = (id) => {
        setActiveRecord(id)
        let data = currentRecord.map((r) => ({
            id: r.id,
            status: r.id === id ? 1 : 0,
        }))
        data.length && activateSeo(data)
    }

    const deleteRecord = (id) => {
        axios
            .delete(config.api.deleteSeo + `/${id}`)
            .then(() => callback())
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (currentRecord.length) {
            const active = currentRecord.find((x) => x.status === 1)
            console.log(active)
            active && setActiveRecord(active.id)
        }
    }, [currentRecord])

    return (
        <div className={className}>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="thead">Type</Table.HeadCell>
                    <Table.HeadCell className="thead">Content</Table.HeadCell>
                    <Table.HeadCell className="thead">
                        Created At
                    </Table.HeadCell>
                    <Table.HeadCell className="thead">Active</Table.HeadCell>
                    <Table.HeadCell className="thead">
                        <span className="sr-only">Action</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentRecord.map((record, key) => (
                        <Table.Row key={key}>
                            <Table.Cell className="whitespace-nowrap font-semibold text-gray-600">
                                {capitalize(record.type)}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-light text-gray-600">
                                {truncate(record.content, {
                                    length: 50,
                                })}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-light text-gray-600">
                                {moment(record.created_at)
                                    .tz('Asia/Kolkata')
                                    .format('LL')}
                            </Table.Cell>
                            <Table.Cell>
                                <ToggleSwitch
                                    checked={record.id === activeRecord}
                                    onChange={() => handleOnChange(record.id)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                {record.id !== activeRecord && (
                                    <TrashIcon
                                        className="text-red-500 w-5 h-5 cursor-pointer"
                                        fill="currentColor"
                                        onClick={() => deleteRecord(record.id)}
                                    />
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

const TitleComponent = ({ user, records, callback }) => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const update = () => {
        setLoading(true)
        const data = {
            type: 'title',
            content: title,
            created_by: user.id,
        }
        const url = config.api.createSeoConfig
        axios
            .post(url, data)
            .then(() => {
                callback()
                setTitle('')
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return (
        <div className="space-y-3">
            <div className="mb-2 block">
                <Label htmlFor="seoTitle" value="SEO Title" />
            </div>
            <TextInput
                id="seoTitle"
                type="text"
                placeholder="Title for Carpe Diem Skills Academy"
                required={true}
                name="title"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                helperText={
                    <span className="text-xs">
                        Enter/Update the SEO title for the website
                    </span>
                }
            />
            <Button onClick={update} disabled={title.length === 0}>
                {loading ? <Spinner size="sm" /> : 'Create'}
            </Button>
            <TableComponent
                records={records}
                entity={'title'}
                className="my-6"
                callback={callback}
            />
        </div>
    )
}

const DescriptionComponent = ({ user, records, callback }) => {
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const update = () => {
        setLoading(true)
        const data = {
            type: 'description',
            content: description,
            created_by: user.id,
        }
        const url = config.api.createSeoConfig
        axios
            .post(url, data)
            .then(() => {
                callback()
                setDescription('')
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }
    return (
        <div className="space-y-3">
            <div className="mb-2 block">
                <Label htmlFor="seoDescription" value="SEO Description" />
            </div>
            <TextInput
                id="seoDescription"
                type="text"
                placeholder="SEO description for Carpe Diem Skills Academy"
                required={true}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description || ''}
                helperText={
                    <span className="text-xs">
                        Enter/Update the SEO Description for the website
                    </span>
                }
            />
            <Button onClick={update} disabled={description.length === 0}>
                {loading ? <Spinner size="sm" /> : 'Create'}
            </Button>
            <TableComponent
                records={records}
                entity={'description'}
                className="my-6"
                callback={callback}
            />
        </div>
    )
}

const KeywordComponent = ({ user, records, callback }) => {
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const update = () => {
        setLoading(true)
        const data = {
            type: 'keyword',
            content: keyword,
            created_by: user.id,
        }
        const url = config.api.createSeoConfig
        axios
            .post(url, data)
            .then(() => {
                callback()
                setKeyword('')
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }
    return (
        <div className="space-y-3">
            <div className="mb-2 block">
                <Label htmlFor="seoKeyword" value="SEO Keyword" />
            </div>
            <TextInput
                id="seoKeyword"
                type="text"
                placeholder="Keyword 1, Keyword 2, Keyword 3"
                required={true}
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword || ''}
                helperText={
                    <span className="text-xs">
                        Enter/Update the SEO keywords for the website.
                        <i>
                            <b>Separate each keyword with a ','</b>
                        </i>
                    </span>
                }
            />
            <Button onClick={update} disabled={keyword.length === 0}>
                {loading ? <Spinner size="sm" /> : 'Create'}
            </Button>
            <TableComponent
                records={records}
                entity={'keyword'}
                className="my-6"
                callback={callback}
            />
        </div>
    )
}

const SEOSettings = () => {
    const { currentUser: user } = useSelector((state) => state.user)
    const [seoRecords, setSeoRecords] = useState([])

    const fetchSeoRecords = () => {
        axios
            .get(config.api.readAllSeoConfig)
            .then(({ data }) => setSeoRecords(data))
            .catch((err) => console.log(err))
    }

    const TabContent = (component, records) => {
        switch (component) {
            case 'Title':
                return (
                    <TitleComponent
                        user={user}
                        records={records}
                        callback={fetchSeoRecords}
                    />
                )
            case 'Description':
                return (
                    <DescriptionComponent
                        user={user}
                        records={records}
                        callback={fetchSeoRecords}
                    />
                )
            case 'Keywords':
                return (
                    <KeywordComponent
                        user={user}
                        records={records}
                        callback={fetchSeoRecords}
                    />
                )
            default:
                break
        }
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
                            <Tabs.Item
                                title={tab.name}
                                key={key}
                                icon={tab.icon}
                            >
                                <div className="mb-6">
                                    {TabContent(tab.name, seoRecords)}
                                </div>
                            </Tabs.Item>
                        )
                    })}
                </Tabs.Group>
            </div>
        </div>
    )
}

export default SEOSettings
