import { CheckCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useState } from 'react'
import { config } from '../config/config'

const SetStudentFee = ({ id, callback, setOpenFeeModal }) => {
    const [formData, setFormData] = useState({
        fee: 100,
        gap: 1,
        period: 'month',
    })

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const activateStudent = () => {
        const url = config.api.updateStudent + `/${id}`
        axios
            .put(url, { status: 1, ...formData })
            .then(() => callback())
            .catch((err) => console.log(err))
            .finally(() => setOpenFeeModal(false))
    }

    return (
        <div>
            <div className="flex space-x-4">
                <div className="w-1/3 space-y-2">
                    <label className="text-slate-400 text-sm" htmlFor="fee">
                        Fee
                    </label>
                    <input
                        type="number"
                        min={100}
                        name="fee"
                        className="form-control"
                        value={formData.fee ?? ''}
                        onChange={handleChange}
                    />
                    <p className="text-xs italic text-slate-500">
                        Minimum: 100
                    </p>
                </div>
                <div className="w-1/3 space-y-2">
                    <label className="text-slate-400 text-sm" htmlFor="gap">
                        Gap
                    </label>
                    <input
                        type="number"
                        min={1}
                        name="gap"
                        className="form-control"
                        value={formData.gap ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-1/3 space-y-2">
                    <label className="text-slate-400 text-sm" htmlFor="period">
                        Period
                    </label>
                    <select
                        name="period"
                        className="form-control"
                        value={formData.period ?? ''}
                        onChange={handleChange}
                    >
                        <option value="day">Day(s)</option>
                        <option value="week">Week(s)</option>
                        <option value="month">Month(s)</option>
                        <option value="year">Year(s)</option>
                    </select>
                </div>
            </div>
            <button className="btn btn-info mx-auto" onClick={activateStudent}>
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Activate Student
            </button>
        </div>
    )
}

export default SetStudentFee
