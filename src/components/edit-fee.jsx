import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const EditFee = ({
    feeData,
    student_id,
    payment_id,
    currentDue,
    lastPaymentTime,
    callback,
}) => {
    const [formData, setFormData] = useState(feeData)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const udpateFeeDetail = async () => {
        try {
            const udpateFeeURL = config.api.updateStudent + `/${student_id}`
            await axios.put(udpateFeeURL, formData)
            console.log(payment_id, lastPaymentTime)
            if (payment_id && lastPaymentTime) {
                const udpateDueURL = config.api.updateDueDate + `/${payment_id}`
                const next_due = calculateDue(lastPaymentTime, formData)
                if (currentDue !== next_due) {
                    await axios.post(udpateDueURL, { next_due })
                }
            }
            callback()
        } catch (error) {
            console.log(error)
        }
    }

    const calculateDue = (lastPayment, newData) => {
        return lastPayment
            ? moment(lastPayment).add(newData.gap, newData.period).format()
            : null
    }

    useEffect(() => {
        const cond = JSON.stringify(formData) === JSON.stringify(feeData)
        setButtonDisabled(cond)
    }, [formData])

    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Edit Fee details
            </div>
            <div>
                <table className="table border-0 shadow-none">
                    <tr>
                        <td className="py-2">Fee</td>
                        <td className="py-2">
                            <input
                                type="number"
                                min="1"
                                name="fee"
                                value={formData.fee || 1}
                                onChange={handleChange}
                                className="form-control-sm"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2">Gap</td>
                        <td className="py-2">
                            <input
                                type="number"
                                min={1}
                                max={12}
                                name="gap"
                                value={formData.gap || 1}
                                onChange={handleChange}
                                className="form-control-sm"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2">Period</td>
                        <td className="py-2">
                            <select
                                name="period"
                                value={formData.period ?? 'day'}
                                onChange={handleChange}
                                className="form-control-sm"
                            >
                                <option value="day">Day(s)</option>
                                <option value="month">Month(s)</option>
                                <option value="week">Week(s)</option>
                                <option value="year">Year(s)</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2"></td>
                        <td className="py-2">
                            <button
                                className="btn-sm btn-info"
                                onClick={udpateFeeDetail}
                                disabled={buttonDisabled}
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default EditFee
