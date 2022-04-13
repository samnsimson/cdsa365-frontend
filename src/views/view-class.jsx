import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/card'
import StudentsAttendingClass from '../components/students-attending-class'
import { config } from '../config/config'

const ViewClass = () => {
    const { slug } = useParams()
    const [cls, setCls] = useState({})

    const fetchClass = () => {
        axios
            .get(config.api.getClassBySlug + `/${slug}`)
            .then(({ data }) => setCls(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchClass()
    }, [slug])

    return (
        <div className="px-6 py-4 flex space-x-4">
            <div className="w-2/3 space-y-4">
                <Card title={'Class Detail'}>
                    <div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-slate-700">
                                {cls.title}
                            </h4>
                            <p className="text-slate-700">{cls.description}</p>
                        </div>
                    </div>
                </Card>
                <Card title={'Students attending'} bodyClass="p-0">
                    <StudentsAttendingClass class_id={cls.id} />
                </Card>
            </div>
            <div className="w-1/3">
                <Card title={'Details'}>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="p-2">Trainer:</td>
                                <td className="p-2">{cls.trainer_name}</td>
                            </tr>
                            <tr>
                                <td className="p-2">Start Time:</td>
                                <td className="p-2">
                                    {moment(cls.start_time)
                                        .tz('Asia/Kolkata')
                                        .format('LLL')}
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2">End Time:</td>
                                <td className="p-2">
                                    {moment(cls.end_time)
                                        .tz('Asia/Kolkata')
                                        .format('LLL')}
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2">Type:</td>
                                <td className="p-2 capitalize">{cls.type}</td>
                            </tr>
                            <tr>
                                <td className="p-2">Status:</td>
                                <td className="p-2 capitalize">
                                    {cls.progress_state?.toLowerCase()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}

export default ViewClass
