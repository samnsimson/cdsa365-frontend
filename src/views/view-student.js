import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import moment from 'moment'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/card'
import Rupee from '../components/rupee'
import ListStudentClasses from './list-student-classes'
import StudentPaymentDetails from './student-payment-details'

const ViewStudent = () => {
    const {
        state: { student },
    } = useLocation()

    return (
        <div className="px-6 py-4">
            <div className="flex space-x-4">
                <div className="w-1/3 space-y-4">
                    <Card title="Profile details">
                        <ul className="space-y-2 text-sm">
                            <li>
                                <h4 className="font-bold">
                                    {student.first_name} {student.last_name}
                                </h4>
                            </li>
                            <li>{moment(student.dob).format('LL')}</li>
                            <li>{student.email}</li>
                            <li>{student.phone}</li>
                            <li>{student.whatsapp}</li>
                            <li>{student.address_one}</li>
                            <li>{student.address_two}</li>
                            <li>{student.city}</li>
                            <li>{student.district}</li>
                            <li>
                                {student.state} - {student.pincode}
                            </li>
                        </ul>
                    </Card>
                    <Card>
                        <table className="w-full">
                            <tbody className="text-sm text-slate-600">
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Joining Date
                                    </td>
                                    <td className="p-1">
                                        {moment(student.created_at).format(
                                            'LL'
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Email verified
                                    </td>
                                    <td className="p-1">
                                        {student.email_verified ? (
                                            <CheckCircleIcon
                                                className="w-5 h-5 text-green-400"
                                                fill="currentColor"
                                            />
                                        ) : (
                                            <ExclamationCircleIcon
                                                className="w-5 h-5 text-red-400"
                                                fill="currentColor"
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Phone verified
                                    </td>
                                    <td className="p-1">
                                        {student.phone_verified ? (
                                            <CheckCircleIcon
                                                className="w-5 h-5 text-green-400"
                                                fill="currentColor"
                                            />
                                        ) : (
                                            <ExclamationCircleIcon
                                                className="w-5 h-5 text-red-400"
                                                fill="currentColor"
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Aadhar number
                                    </td>
                                    <td className="p-1">
                                        {student.aadhar_number}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                    <Card>
                        <table className="w-full">
                            <tbody className="text-sm text-slate-600">
                                <tr>
                                    <td className="p-1 font-semibold">Fee</td>
                                    <td className="p-1">
                                        <Rupee />
                                        {student.fee}/-
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Payment
                                    </td>
                                    <td className="p-1">
                                        Every {student.gap > 1 && student.gap}{' '}
                                        {student.period}
                                        {student.gap > 1 && 's'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 font-semibold">
                                        Status
                                    </td>
                                    <td className="p-1">
                                        {student.status === 0 &&
                                            'Pending Activation'}
                                        {student.status === 1 && 'Active'}
                                        {student.status === 2 && 'Rejected'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
                <div className="w-2/3 space-y-4">
                    <Card title={'Class details'}>
                        <ListStudentClasses id={student.id} />
                    </Card>
                    <Card title={'Payment details'}>
                        <StudentPaymentDetails id={student.id} />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ViewStudent
