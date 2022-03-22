import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Badge from '../components/badge'
import { config } from '../config/config'
import moment from 'moment-timezone'
import {
    EyeOffIcon,
    LightningBoltIcon,
    TrashIcon,
} from '@heroicons/react/solid'

const ListClasses = () => {
    const [classes, setClasses] = useState([])

    const updateClassStatus = (id, status) => {
        axios
            .patch(config.api.updateClassStatus, { id, status })
            .then(({ data }) => fetchClasses())
    }

    const fetchClasses = () => {
        axios
            .get(config.api.fetchClasses)
            .then(({ data }) => setClasses(data))
            .catch((err) => console.log(err))
    }

    const deleteClass = (id) => {
        axios
            .delete(config.api.deleteClass + `/${id}`)
            .then(({ data }) => fetchClasses())
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchClasses()
    }, [])

    return (
        <div className="px-6 py-4">
            <div className="flex w-full py-4">
                <h4 className="font-semibold text-gray-500">All Classes</h4>
            </div>
            <div className="w-full">
                <div className="table-card">
                    <table className="items-center w-full bg-transparent border-collapse border-1 shadow-sm">
                        <thead>
                            <th className="thead w-4">#</th>
                            <th className="thead">Title</th>
                            <th className="thead">Date</th>
                            <th className="thead">Time</th>
                            <th className="thead">Status</th>
                            <th className="thead">Action</th>
                        </thead>
                        <tbody>
                            {classes.map((c, key) => (
                                <tr key={key}>
                                    <td className="p-4 w-4">#</td>
                                    <td className="p-4">{c.title}</td>
                                    <td className="p-4">
                                        {moment(c.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LL')}
                                    </td>
                                    <td className="p-4">
                                        {moment(c.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LT') +
                                            ' - ' +
                                            moment(c.end_time)
                                                .tz('Asia/Kolkata')
                                                .format('LT')}
                                    </td>
                                    <td className="p-4">
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
                                    <td className="p-4">
                                        <div className="flex justify-end space-x-4">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListClasses
