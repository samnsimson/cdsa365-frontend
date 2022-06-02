import {
    ChatIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    MailIcon,
    PhoneIcon,
} from '@heroicons/react/solid'
import moment from 'moment'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Badge from '../components/badge'
import Card from '../components/card'
import EditFee from '../components/edit-fee'
import ExtendDueDate from '../components/extend-due-date'
import Modal from '../components/modal'
import Rupee from '../components/rupee'
import ListStudentClasses from './list-student-classes'
import StudentPaymentDetails from './student-payment-details'

const ViewStudent = () => {
    const [openModal, setOpenModal] = useState(false)
    const [editFeeModal, setEditFeeModal] = useState(false)
    const {
        state: { student },
    } = useLocation()

    const togglePaymentModal = () => {
        setOpenModal(!openModal)
    }

    const toggleFeeModal = () => {
        setEditFeeModal(!editFeeModal)
    }

    return (
        <>
            <div className="w-full p-6 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 space-y-2 ">
                <div>
                    <p className="font-medium text-white text-center">
                        ID: {student.id}
                    </p>
                    <h1 className="font-black text-3xl text-white my-1 text-center">
                        {student.first_name} {student.last_name}
                    </h1>
                    <p className="text-sm text-white flex items-center justify-center">
                        <MailIcon
                            className="w-4 h-4 text-white mr-2"
                            fill="currentColor"
                        />
                        {student.email}
                    </p>
                    <div className="flex space-x-4 items-center justify-center">
                        <p className="text-sm text-white flex items-center">
                            <PhoneIcon
                                className="w-4 h-4 text-white mr-2"
                                fill="currentColor"
                            />
                            {student.phone}
                        </p>
                        <p className="text-sm text-white flex items-center">
                            <ChatIcon
                                className="w-4 h-4 text-white mr-2"
                                fill="currentColor"
                            />
                            {student.whatsapp}
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="flex space-x-4">
                    <div className="w-1/3 space-y-4">
                        <Card title="Address">
                            <p className="text-sm text-gray-600">
                                {student.address_one},{' '}
                                {student.address_two
                                    ? student.address_two + ', '
                                    : null}
                                {student.city}, {student.district},{' '}
                                {student.state} - {student.pincode}
                            </p>
                        </Card>
                        <Card>
                            <table className="w-full">
                                <tbody className="text-sm text-slate-600">
                                    <tr>
                                        <td className="p-1 font-semibold">
                                            Account Status
                                        </td>
                                        <td className="p-1">
                                            {student.status === 0 &&
                                                'Pending Activation'}
                                            {student.status === 1 && 'Active'}
                                            {student.status === 2 && 'Rejected'}
                                        </td>
                                    </tr>
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
                                        <td className="p-1 font-semibold">
                                            Fee
                                        </td>
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
                                            Every{' '}
                                            {student.gap > 1 && student.gap}{' '}
                                            {student.period}
                                            {student.gap > 1 && 's'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-1 font-semibold">
                                            Payment Status
                                        </td>
                                        <td className="p-1">
                                            {moment().isBefore(
                                                moment(student.next_due)
                                            ) ? (
                                                <Badge
                                                    color="green"
                                                    message="Paid"
                                                />
                                            ) : (
                                                <Badge
                                                    color="red"
                                                    message="Unpaid"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pt-3">
                                            <button
                                                className="w-full btn-sm btn-info"
                                                onClick={togglePaymentModal}
                                            >
                                                Extend payment due
                                            </button>
                                        </td>
                                        <td className="pt-3">
                                            <button
                                                className="w-full btn-sm btn-info"
                                                onClick={toggleFeeModal}
                                            >
                                                Edit Fee
                                            </button>
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
                {openModal && (
                    <Modal setOpenModal={setOpenModal}>
                        <ExtendDueDate
                            payment_id={student.payment_id}
                            currentDue={student.next_due}
                            callback={togglePaymentModal}
                        />
                    </Modal>
                )}
                {editFeeModal && (
                    <Modal setOpenModal={setEditFeeModal}>
                        <EditFee
                            feeData={{
                                fee: String(student.fee),
                                gap: String(student.gap),
                                period: student.period,
                            }}
                            student_id={student.id}
                            payment_id={student.payment_id}
                            currentDue={student.next_due}
                            lastPaymentTime={student.order_created_at}
                            callback={toggleFeeModal}
                        />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default ViewStudent
