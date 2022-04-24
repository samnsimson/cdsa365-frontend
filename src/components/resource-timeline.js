import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { config } from '../config/config'
import axios from 'axios'
import Card from './card'
import { daysOfWeek } from '../constants/constant'
import Rupee from './rupee'

const ResourceTimeline = ({ id, selectedWeek, selectedMonth, salary }) => {
    const [attendance, setAttendance] = useState([])
    const [durations, setDurations] = useState([])
    const [weeklyHours, setWeeklyHours] = useState(0)
    const [monthlyHours, setMonthlyHours] = useState(0)

    const getDuration = (d, attendance) => {
        if (d && attendance[d]) {
            let seconds = attendance[d].duration
            return secondsToHours(seconds)
        } else {
            return '0:00:00'
        }
    }

    const secondsToHours = (secs) => {
        let dur = moment.duration(secs, 'seconds')
        let hours = Math.floor(dur.asHours())
        let mins = Math.floor(dur.asMinutes()) - hours * 60
        let sec = Math.floor(dur.asSeconds()) - hours * 60 * 60 - mins * 60
        let minutes = mins > 9 ? mins : '0' + mins
        let seconds = sec > 9 ? sec : '0' + sec
        let result = hours + ':' + minutes + ':' + seconds
        return result
    }

    const calcPayout = (salary, hours) => {
        const value = (salary / (60 * 60)) * hours
        return value.toFixed(2)
    }

    const getWeeklyHours = () => {
        setWeeklyHours(attendance.duration)
    }

    const getMonthlyHours = () => {
        const monthlyData = durations
            .filter((o) => (o.month = selectedMonth))
            .map((o) => o.duration)
        console.log(monthlyData)
        const seconds = monthlyData.reduce((a, b) => a + b, 0)
        setMonthlyHours(seconds)
    }

    const fetchAttendanceData = async (week, month, year) => {
        const urlAParams = `${id}/${year}/${month}/${week}`
        const urlBParams = `${id}/${year}/${month}`
        const urlA = config.api.getAttendance + `/${urlAParams}`
        const urlB = config.api.getMonthlyDurations + `/${urlBParams}`
        const attendance = axios.get(urlA)
        const duration = axios.get(urlB)
        const promiseArray = [attendance, duration]
        const [att, dur] = await Promise.allSettled(promiseArray)
        setAttendance(att.value.data)
        setDurations(dur.value.data)
    }

    useEffect(() => {
        const week = moment(selectedWeek).isoWeek()
        const month = moment(selectedWeek).month() + 1
        const year = moment(selectedWeek).year()
        fetchAttendanceData(week, month, year)
    }, [selectedWeek, selectedMonth])

    useEffect(() => {
        getWeeklyHours()
        getMonthlyHours()
    }, [attendance, durations])

    useEffect(() => {
        console.log(weeklyHours, monthlyHours)
    }, [weeklyHours, monthlyHours])

    return (
        <Card>
            <table className="table shadow-none border-0 mb-3">
                <tbody>
                    {daysOfWeek.map((day, i) => (
                        <tr className="" key={i}>
                            <td className=" px-2 py-3 w-1/12 uppercase text-gray-400 text-sm">
                                {day}
                            </td>
                            <td className=" px-2 py-3 w-10/12">
                                <div className="progress-container">
                                    {attendance &&
                                        attendance[day]?.timeline?.map(
                                            (item, i) => (
                                                <div
                                                    className={`progress ${
                                                        !item.idle &&
                                                        'bg-blue-500'
                                                    }`}
                                                    style={{
                                                        width: `${item.duration}%`,
                                                    }}
                                                    key={i}
                                                ></div>
                                            )
                                        )}
                                </div>
                            </td>
                            <td
                                className={`px-2 py-3 w-1/12 ${
                                    getDuration(day, attendance) ===
                                        '00:00:00' && 'text-gray-400'
                                }`}
                            >
                                {getDuration(day, attendance)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <table className="w-full mt-4">
                <tbody>
                    <tr>
                        <td className="p-2">Total hours (Week)</td>
                        <td className="p-2">{secondsToHours(weeklyHours)}</td>
                        <td className="p-2">Total hours (Month)</td>
                        <td className="p-2">{secondsToHours(monthlyHours)}</td>
                    </tr>
                    <tr>
                        <td className="p-2">Pay per hour</td>
                        <td className="p-2">
                            <Rupee />
                            {salary}
                        </td>
                        <td className="p-2">Pay per hour</td>
                        <td className="p-2">
                            <Rupee />
                            {salary}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2">Payout (Week)</td>
                        <td className="p-2">
                            <Rupee />
                            {calcPayout(salary, weeklyHours)}
                        </td>
                        <td className="p-2">Payout (Month)</td>
                        <td className="p-2">
                            <Rupee />
                            {calcPayout(salary, monthlyHours)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    )
}

export default ResourceTimeline
