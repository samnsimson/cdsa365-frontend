import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import Alert from '../components/alert'
import Card from '../components/card'
import { config } from '../config/config'

const Payments = () => {
    const [studentId, setStudentId] = useState('')
    const [studentEmail, setStudentEmail] = useState('')
    const [studentPhone, setStudentPhone] = useState('')
    const [paymentData, setPaymentData] = useState({})
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        fee: paymentData.fee || 0,
        paid: paymentData.fee || 0,
        due: paymentData.due || 0,
    })
    const url = config.api.getPaymentDataForManualEntry

    const searchPaymentDataForStudentID = (noReload = false) => {
        if (!noReload) setPaymentData({})
        axios
            .get(url + `/student_id/${studentId}`)
            .then(({ data }) => {
                if (error) setError(null)
                setPaymentData(data)
            })
            .catch((err) => setError(err.response.data.message))
    }
    const searchPaymentDataForStudentEmail = () => {
        setPaymentData({})
        axios
            .get(url + `/student_email/${studentEmail}`)
            .then(({ data }) => {
                if (error) setError(null)
                setPaymentData(data)
            })
            .catch((err) => setError(err.response.data.message))
    }
    const searchPaymentDataForStudentPhone = () => {
        setPaymentData({})
        axios
            .get(url + `/student_phone/${studentPhone}`)
            .then(({ data }) => {
                if (error) setError(null)
                setPaymentData(data)
            })
            .catch((err) => setError(err.response.data.message))
    }

    const handleClick = (student_id) => {
        console.log('STUDENT ID', student_id)
        const url = config.api.captureManualPayment
        axios
            .post(url, {
                student_id,
                amount: formData.fee * 100,
                paid: formData.paid * 100,
                due: formData.due * 100,
                gap: paymentData.gap || 0,
                period: paymentData.period || 0,
            })
            .then(() => searchPaymentDataForStudentID(true))
            .catch((err) => console.log(err))
    }

    const handleOnchange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (paymentData.id) {
            setStudentId(paymentData.id)
        }
        setFormData({
            fee: paymentData.fee || 0,
            paid: paymentData.fee || 0,
            due: paymentData.due || 0,
        })
    }, [paymentData])

    return (
        <div className="px-6 py-4">
            <div>
                <h4 className="font-semibold text-gray-500">Payments</h4>
            </div>
            <div className="flex space-x-4">
                <div className="mt-4 w-1/3">
                    <table className="w-full">
                        <tr>
                            <td>
                                <p className="text-sm">Student ID</p>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="student_id"
                                    className="form-control-sm"
                                    value={studentId || null}
                                    onChange={(e) =>
                                        setStudentId(e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={searchPaymentDataForStudentID}
                                >
                                    Search
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="text-sm">Student E-mail</p>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="student_email"
                                    className="form-control-sm"
                                    onChange={(e) =>
                                        setStudentEmail(e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={searchPaymentDataForStudentEmail}
                                >
                                    Search
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="text-sm">Student Phone</p>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="student_phone"
                                    className="form-control-sm"
                                    onChange={(e) =>
                                        setStudentPhone(e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={searchPaymentDataForStudentPhone}
                                >
                                    Search
                                </button>
                            </td>
                        </tr>
                    </table>
                    {Object.keys(paymentData).length > 0 && !error && (
                        <>
                            <Card title="Student Detail" className="mt-4 mb-2">
                                <table>
                                    <tr>
                                        <td className="text-sm text-gray-600">
                                            Name:
                                        </td>
                                        <td>
                                            <span className="px-2">
                                                {paymentData.name}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm text-gray-600">
                                            Email:
                                        </td>
                                        <td>
                                            <span className="px-2">
                                                {paymentData.email}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm text-gray-600">
                                            Phone:
                                        </td>
                                        <td>
                                            <span className="px-2">
                                                {paymentData.phone}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </Card>
                            <Card title="Capture payment" className="mt-4 mb-2">
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="fee"
                                            className="text-sm text-gray-600"
                                        >
                                            Fee
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            onChange={handleOnchange}
                                            name="fee"
                                            value={formData.fee || 0}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="paid"
                                            className="text-sm text-gray-600"
                                        >
                                            Amount Paid
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            onChange={handleOnchange}
                                            name="paid"
                                            value={formData.paid || 0}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="due"
                                            className="text-sm text-gray-600"
                                        >
                                            Amount Due
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            onChange={handleOnchange}
                                            name="due"
                                            value={formData.due || 0}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-success w-full"
                                        onClick={() =>
                                            handleClick(paymentData.id)
                                        }
                                    >
                                        Create payment entry
                                    </button>
                                </div>
                            </Card>
                        </>
                    )}
                </div>
                <div className="mt-4 w-2/3">
                    {error && <Alert type="danger" message={error} />}
                    {Object.keys(paymentData).length > 0 && !error && (
                        <Card title={'Payment history'} bodyClass="p-0">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="thead py-2">
                                            Receipt #
                                        </th>
                                        <th className="thead py-2">Fee</th>
                                        <th className="thead py-2">Paid</th>
                                        <th className="thead py-2">Due</th>
                                        <th className="thead py-2">Status</th>
                                        <th className="thead py-2">Paid on</th>
                                        <th className="thead py-2">Next due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentData.payment_data.map(
                                        (pd) =>
                                            pd.receipt &&
                                            pd.status !== 'created' && (
                                                <tr>
                                                    <td className="p-4 py-2">
                                                        {pd.receipt}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {paymentData.fee}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {pd.amount}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {pd.due}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {pd.status ===
                                                            'paid' && (
                                                            <CheckCircleIcon
                                                                className="w-4 h-4 text-green-400"
                                                                fill="currentColor"
                                                            />
                                                        )}
                                                        {pd.status ===
                                                            'failed' && (
                                                            <ExclamationCircleIcon
                                                                className="w-4 h-4 text-red-400"
                                                                fill="currentColor"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {moment(pd.paid_on)
                                                            .tz('Asia/Kolkata')
                                                            .format('LL')}
                                                    </td>
                                                    <td className="p-4 py-2">
                                                        {moment(pd.next_due)
                                                            .tz('Asia/Kolkata')
                                                            .format('LL')}
                                                    </td>
                                                </tr>
                                            )
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Payments
