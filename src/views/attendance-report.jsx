import { CheckIcon, XIcon } from '@heroicons/react/solid'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { config } from '../config/config'
import { months, monthsOfYear } from '../constants/constant'
import { capitalize } from '../helpers/helper'

const AttendanceReport = () => {
    const [data, setData] = useState([])
    const [years, setYears] = useState([])
    const [formData, setFormData] = useState({
        month: moment().month() + 1,
        year: moment().year(),
    })
    const daysInMonth = moment(
        `${formData.year}-${formData.month}`
    ).daysInMonth()
    const dayFiller = [...Array.from(Array(daysInMonth).keys())]
    const students = Object.entries(data)

    const fetchAttendanceData = () => {
        const url = config.api.getAttendanceReport
        axios
            .post(url, { year: formData.year, month: formData.month })
            .then(({ data }) => setData(data))
            .catch((err) => console.log(err))
    }

    const getYearOptions = (period) => {
        const years = []
        const startYear = moment().subtract(period, 'years').year()
        const endYear = moment().add(period, 'years').year()
        for (let i = startYear; i <= endYear; i++) years.push(i)
        setYears(years)
    }

    const handleChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        getYearOptions(10)
    }, [])

    useEffect(() => {
        fetchAttendanceData()
    }, [formData])

    return (
        <div className="px-6 py-4">
            <div className="flex items-center mb-4 space-x-4">
                <label htmlFor="year">Year:</label>
                <select
                    name="year"
                    className="form-control-sm w-32"
                    value={formData.year ?? moment().year()}
                    onChange={handleChange}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <label htmlFor="year">Month:</label>
                <select
                    name="month"
                    className="form-control-sm w-32"
                    value={
                        formData.month ?? months[monthsOfYear[moment().month()]]
                    }
                    onChange={handleChange}
                >
                    {Object.entries(months).map(([key, value]) => (
                        <option
                            key={key}
                            value={value}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {capitalize(key)}
                        </option>
                    ))}
                </select>
            </div>
            <Card
                title={'Student attendance Report'}
                bodyClass="p-0 overflow-x-auto scroll-m-0"
            >
                <table className="table border-0 shadow-none">
                    <thead>
                        <th className="thead p-2">Name</th>
                        <th className="thead p-2">Class</th>
                        <table className="table border-1 border-sky-200 shadow-none">
                            <tr>
                                <th
                                    className="thead p-2 text-center"
                                    colSpan={31}
                                >
                                    {monthsOfYear[formData.month - 1]}
                                </th>
                            </tr>
                            <tr>
                                {dayFiller.map((date) => {
                                    date = date + 1
                                    return (
                                        <th
                                            className="thead p-2 border-1 border-sky-200"
                                            key={date}
                                        >
                                            <div className="w-[20px]">
                                                {date}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        </table>
                    </thead>
                    <tbody>
                        {students.map(([key, value], i) => (
                            <tr
                                key={i}
                                className="text-xs border-0 last:border-b-0"
                            >
                                <td className="whitespace-nowrap p-2">
                                    <div className="w-32">{key}</div>
                                </td>
                                <td>
                                    <table className="border-1">
                                        {Object.entries(value).map(
                                            ([key, value], i) => {
                                                return (
                                                    <tr
                                                        key={i}
                                                        className="border-1"
                                                    >
                                                        <td className="whitespace-nowrap p-2">
                                                            <div className="w-64">
                                                                {key}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )}
                                    </table>
                                </td>
                                <td>
                                    <table className="table shadow-none border-1 h-full border-collapse">
                                        {Object.values(value).map((item, i) => {
                                            return (
                                                <tr
                                                    key={i}
                                                    className="border-b-1 last:border-b-0 "
                                                >
                                                    {dayFiller.map((day, i) => {
                                                        day = day + 1

                                                        return (
                                                            <td
                                                                className="p-2 text-center border-1"
                                                                key={i}
                                                            >
                                                                <div className="w-[20px]">
                                                                    {item.map(
                                                                        (
                                                                            o,
                                                                            i
                                                                        ) =>
                                                                            o?.date ==
                                                                                day &&
                                                                            (o.attendance ===
                                                                            'PRESENT' ? (
                                                                                <CheckIcon
                                                                                    className="w-4 h-4 text-green-500"
                                                                                    fill="currentColor"
                                                                                />
                                                                            ) : (
                                                                                <XIcon
                                                                                    className="w-4 h-4 text-red-500"
                                                                                    fill="currentColor"
                                                                                />
                                                                            ))
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default AttendanceReport
