import moment from 'moment-timezone'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/card'

const ViewLeadDetail = () => {
    const { state } = useLocation()
    return (
        <div className="py-4 px-6 w-full">
            <Card title={'Lead Detail'}>
                <table className="table border-0 shadow-none">
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Name</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">
                            {state.first_name + ' ' + state.last_name}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Email</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">{state.email}</td>
                    </tr>
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Phone</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">{state.phone}</td>
                    </tr>
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Program</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">{state.program}</td>
                    </tr>
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Message</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">{state.message}</td>
                    </tr>
                    <tr>
                        <td className="p-4 w-64">
                            <div className="font-bold flex justify-between">
                                <span>Lead captured at</span>
                                <span>:</span>
                            </div>
                        </td>
                        <td className="p-4">
                            {moment(state.created_at)
                                .tz('Asia/Kolkata')
                                .format('LLL')}
                        </td>
                    </tr>
                </table>
            </Card>
        </div>
    )
}

export default ViewLeadDetail
