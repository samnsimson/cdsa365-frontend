import { EyeIcon, MailIcon, PhoneIcon, TrashIcon } from '@heroicons/react/solid'
import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/card'
import { config } from '../config/config'
import { capitalize } from '../helpers/helper'

const ViewLeads = () => {
    const [leads, setLeads] = useState([])

    const fetchLeads = async () => {
        try {
            const { data } = await axios.get(config.api.getLeads)
            setLeads(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [])

    return (
        <div className="px-6 py-4">
            <Card title={'Leads'} bodyClass="p-0">
                <table className="table border-0 shadow-none">
                    <thead>
                        <tr>
                            <th className="thead">Name</th>
                            <th className="thead">Email</th>
                            <th className="thead">Phone</th>
                            <th className="thead">Program</th>
                            <th className="thead">Lead captured at</th>
                            <th className="thead">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, key) => {
                            return (
                                <tr key={key} className="text-sm">
                                    <td className="p-4">
                                        {lead.first_name} {lead.last_name}
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`mailto:${lead.email}`}
                                            className="flex items-center"
                                        >
                                            <MailIcon
                                                className="w-4 h-4 mr-2 text-sky-500"
                                                fill="currentColor"
                                            />
                                            {lead.email}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`tel:${lead.phone}`}
                                            className="flex items-center"
                                        >
                                            <PhoneIcon
                                                className="w-4 h-4 mr-2 text-sky-500"
                                                fill="currentColor"
                                            />
                                            {lead.phone}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        {lead.program
                                            ? capitalize(lead.program)
                                            : '-'}
                                    </td>
                                    <td className="p-4">
                                        {moment(lead.created_at)
                                            .tz('Asia/Kolkata')
                                            .format('LLL')}
                                    </td>
                                    <td className="p-4 flex space-x-4">
                                        <Link
                                            to={`/dashboard/leads/view/${lead.id}`}
                                            state={{ ...lead }}
                                        >
                                            <div className="flex items-center text-sky-500 hover:text-sky-600">
                                                <EyeIcon className="w-4 h-4 mr-2" />
                                                View
                                            </div>
                                        </Link>
                                        <div className="flex items-center text-red-500 hover:text-red-600">
                                            <TrashIcon className="w-4 h-4 mr-2" />
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default ViewLeads
