import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { config } from '../config/config'
import axios from 'axios'
import Card from './card'
import { daysOfWeek } from '../constants/constant'

const ResourceTimeline = ({ id }) => {
    const [attendance, setAttendance] = useState([])
    const [selectedWeek, setSelectedWeek] = useState(() => {
        let currentTime = moment()
        let year = currentTime.format('YYYY')
        let week = currentTime.isoWeek()
        let selected = `${year}-W${week}`
        return selected
    })

    const getDuration = (d, attendance) => {
        if (d && attendance[d]) {
            let seconds = attendance[d].duration
            return moment.utc(seconds * 1000).format('HH:mm:ss')
        } else {
            return '0:00:00'
        }
    }

    useEffect(() => {
        const week = moment(selectedWeek).isoWeek()
        const month = moment(selectedWeek).month() + 1
        const year = moment(selectedWeek).year()
        axios
            .get(config.api.getAttendance + `/${id}/${week}/${month}/${year}`)
            .then(({ data }) => {
                setAttendance(data)
            })
            .catch((err) => console.log(err))
    }, [selectedWeek])

    useEffect(() => {
        console.log(attendance)
    }, [attendance])

    return (
        <Card>
            <table className="table shadow-none border-0 mb-3">
                <tbody>
                    {daysOfWeek.map((day) => (
                        <tr className="">
                            <td className=" px-2 py-3 w-1/12 uppercase text-gray-400 text-sm">
                                {day}
                            </td>
                            <td className=" px-2 py-3 w-10/12">
                                <div className="progress-container">
                                    {attendance &&
                                        attendance[day]?.timeline?.map(
                                            (item) => (
                                                <div
                                                    className={`progress ${
                                                        !item.idle &&
                                                        'bg-blue-500'
                                                    }`}
                                                    style={{
                                                        width: `${item.duration}%`,
                                                    }}
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
        </Card>
    )
}

export default ResourceTimeline
