import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'
import Rupee from './rupee'

const MonthlyPayoutData = ({ id, year, salary }) => {
    const [payoutData, setPayoutData] = useState({})

    const fetchPayoutData = (year) => {
        const urlParams = `${id}/${year}`
        const url = config.api.getYearlyDuration + `/${urlParams}`
        axios
            .get(url)
            .then(({ data }) => setPayoutData(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchPayoutData(year)
    }, [year])

    useEffect(() => {
        console.log(payoutData)
    }, [payoutData])

    return (
        <table className="w-full border-separate border-1">
            <thead>
                <tr>
                    {payoutData &&
                        Object.keys(payoutData).map((month, i) => (
                            <th
                                className="thead first:bg-sky-200 last:bg-sky-200"
                                key={i}
                            >
                                {month !== 'year' && month !== 'total'
                                    ? month.substring(0, 3)
                                    : month}
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {payoutData &&
                        Object.entries(payoutData).map(([key, tot], i) => (
                            <td
                                className={`p-4 bg-gray-50 first:bg-gray-200 last:bg-gray-200 ${
                                    tot == 0 && 'text-gray-400'
                                }`}
                                key={i}
                            >
                                {key !== 'year' && <Rupee />}
                                {tot}
                            </td>
                        ))}
                </tr>
            </tbody>
        </table>
    )
}

export default MonthlyPayoutData
