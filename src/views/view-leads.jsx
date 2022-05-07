import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
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
                            <th className="thead">Message</th>
                            <th className="thead">Lead captured at</th>
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
                                        <a href={`mailto:${lead.email}`}>
                                            {lead.email}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <a href={`tel:+91${lead.phone}`}>
                                            {lead.phone}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        {lead.program
                                            ? capitalize(lead.program)
                                            : '-'}
                                    </td>
                                    <td className="p-4">
                                        {lead.message
                                            ? lead.message.substring(0, 50)
                                            : '-'}
                                    </td>
                                    <td className="p-4">
                                        {moment(lead.created_at)
                                            .tz('Asia/Kolkata')
                                            .format('LLL')}
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
