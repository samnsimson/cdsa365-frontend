import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const ExtendDueDate = ({ payment_id, currentDue, callback }) => {
    const [formData, setFormData] = useState({
        period: 'day',
        gap: '1',
        payment_id,
        currentDue,
    })

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const extendDueDate = () => {
        axios
            .post(config.api.extendDueDate + `/${payment_id}`, formData)
            .then(() => callback())
            .catch((err) => console.log(err))
    }

    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Entend payment date
            </div>
            <div>
                <div className="text-center mb-4">
                    <span className="text-gray-500">Current due date: </span>
                    {currentDue
                        ? moment(currentDue).tz('Asia/Kolkata').format('LLL')
                        : '-'}
                </div>
                <table className="w-full" cellPadding={10}>
                    <tbody>
                        <tr>
                            <td>Gap</td>
                            <td>
                                <input
                                    type="number"
                                    name="gap"
                                    min={1}
                                    max={31}
                                    value={formData.gap ?? 1}
                                    className="form-control"
                                    disabled={!currentDue}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>Period</td>
                            <td>
                                <select
                                    name="period"
                                    value={formData.period ?? 'day'}
                                    className="form-control"
                                    disabled={!currentDue}
                                    onChange={handleChange}
                                >
                                    <option value="day">Day(s)</option>
                                    <option value="month">Month(s)</option>
                                    <option value="week">Week(s)</option>
                                    <option value="year">Year(s)</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    className="btn btn-info"
                    onClick={extendDueDate}
                    disabled={!currentDue}
                >
                    Extend
                </button>
            </div>
        </div>
    )
}

export default ExtendDueDate
