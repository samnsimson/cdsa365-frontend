import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/badge'
import Placeholder from '../components/placeholder'
import { config } from '../config/config'

const ListStudentClasses = ({ id }) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axios
            .get(config.api.getStudentClasses + `/${id}`)
            .then(({ data }) => {
                setClasses(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="-m-6">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="thead p-2">Status</th>
                        <th className="thead p-2">Date</th>
                        <th className="thead p-2">Time</th>
                        <th className="thead p-2">Class</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length > 0 ? (
                        classes.map((cls, i) => {
                            let color = ''
                            switch (cls.progress_state) {
                                case 'SCHEDULED':
                                    color = 'yellow'
                                    break
                                case 'IN PROGRESS':
                                    color = 'green'
                                    break
                                case 'COMPLETED':
                                    color = 'red'
                                    break
                                default:
                                    break
                            }
                            return (
                                <tr
                                    className="border-b last:border-b-0 text-xs"
                                    key={i}
                                >
                                    <td className="p-4">
                                        <Badge
                                            color={color}
                                            message={cls.progress_state}
                                        />
                                    </td>
                                    <td className="p-4">
                                        {moment(cls.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LL')}
                                    </td>
                                    <td className="p-4">
                                        {moment(cls.start_time)
                                            .tz('Asia/Kolkata')
                                            .format('LT')}{' '}
                                        -{' '}
                                        {moment(cls.end_time)
                                            .tz('Asia/Kolkata')
                                            .format('LT')}
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/dashboard/classes/view/${cls.slug}`}
                                        >
                                            <p>{cls.title}</p>
                                        </Link>
                                        <p className="text-slate-400">
                                            Trainer: {cls.trainer_name}
                                        </p>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <Placeholder message={'No classes to show'} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentClasses
