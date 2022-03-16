import {
    CalendarIcon,
    ExternalLinkIcon,
    UserIcon,
} from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/badge'

const ListTrainers = () => {
    const [trainers, setTrainers] = useState([])

    const fetchTrainers = () => {
        const url = 'http://localhost:4000/v1/dev/admin/trainers'
        axios
            .get(url)
            .then(({ data }) => {
                if (data) setTrainers(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchTrainers()
    }, [])

    return (
        <div className="py-4 px-6">
            <div className="py-4 w-full flex justify-between">
                <h4 className="font-semibold text-gray-500">All trainers</h4>
            </div>
            <div className="w-full h-[75vh] sm:rounded-lg overflow-hidden bg-white overflow-y-scroll">
                <table className="items-center w-full bg-transparent border-collapse border-1 shadow-sm">
                    <thead>
                        <tr>
                            <th className="thead">#</th>
                            <th className="thead">Name</th>
                            <th className="thead">Category</th>
                            <th className="thead">Status</th>
                            <th className="thead">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, key) => (
                            <tr key={key} className="table-hover group">
                                <td className="p-4">{trainer.id}</td>
                                <td className="p-4">
                                    <Link
                                        to={`/dashboard/trainers/view/${trainer.id}`}
                                    >
                                        <span class="flex">
                                            <img
                                                class="h-10 w-10 rounded-full"
                                                src={`https://i.pravatar.cc/150?img=${
                                                    key + 1
                                                }`}
                                                alt=""
                                            />
                                            <div class="ml-3 overflow-hidden">
                                                <p class="text-sm font-medium text-slate-900 group-hover:text-sky-500">
                                                    {trainer.first_name}{' '}
                                                    {trainer.last_name}
                                                </p>
                                                <p class="text-sm text-slate-500 truncate">
                                                    {trainer.email}
                                                </p>
                                            </div>
                                        </span>
                                    </Link>
                                </td>
                                <td className="p-4">-</td>
                                <td className="p-4">
                                    <div className="flex justify-start">
                                        {trainer.invite_status === 1 &&
                                            trainer.status === 0 && (
                                                <Badge
                                                    color="green"
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
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTrainers
