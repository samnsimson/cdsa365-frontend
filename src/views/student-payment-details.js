import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'
import Rupee from '../components/rupee'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationIcon,
} from '@heroicons/react/solid'
import Placeholder from '../components/placeholder'

const StudentPaymentDetails = ({ id }) => {
    const [payments, setPayments] = useState([])

    const fetchPaymentDetails = () => {
        axios
            .get(config.api.getPaymentHistory + `/${id}`)
            .then(({ data }) => setPayments(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchPaymentDetails()
    }, [])

    return (
        <div className="-m-6">
            <table className="w-full">
                <thead>
                    <th className="thead py-2">Receipt #</th>
                    <th className="thead py-2">Fee</th>
                    <th className="thead py-2">Paid</th>
                    <th className="thead py-2">Due</th>
                    <th className="thead py-2">Status</th>
                    <th className="thead py-2">Paid on</th>
                    <th className="thead py-2">Next due</th>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map((payment) => (
                            <tr className="border-b last:border-b-0 text-xs">
                                <td className="p-4">{payment.receipt_id}</td>
                                <td className="p-4">
                                    <Rupee symbol={payment.symbol} />
                                    {payment.amount / 100}
                                </td>
                                <td className="p-4">
                                    <Rupee symbol={payment.symbol} />
                                    {payment.paid / 100}
                                </td>
                                <td className="p-4">
                                    <Rupee symbol={payment.symbol} />
                                    {payment.due / 100}
                                </td>
                                <td className="p-4">
                                    {payment.status === 'paid' && (
                                        <CheckCircleIcon
                                            className="w-4 h-4 text-green-400"
                                            fill="currentColor"
                                        />
                                    )}
                                    {payment.status === 'failed' && (
                                        <ExclamationCircleIcon
                                            className="w-4 h-4 text-red-400"
                                            fill="currentColor"
                                        />
                                    )}
                                </td>
                                <td className="p-4">
                                    {moment(payment.order_created_at)
                                        .tz('Asia/Kolkata')
                                        .format('LL')}
                                </td>
                                <td className="p-4">
                                    {moment(payment.next_due)
                                        .tz('Asia/Kolkata')
                                        .format('LL')}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <Placeholder
                                    message={'No payment data to show'}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StudentPaymentDetails
