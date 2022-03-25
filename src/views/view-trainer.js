import {
    HomeIcon,
    MailIcon,
    AcademicCapIcon,
    PhoneIcon,
    ChatAlt2Icon,
    ChatIcon,
} from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfilePicture from '../components/profile-picture'
import { config } from '../config/config'
import { Chart } from 'react-google-charts'
import SectionTitle from '../components/section-title'
import ListAssignedClasses from '../components/list-assigned-classes'

const ViewTrainer = () => {
    const [trainer, setTrainer] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const columns = [
        { type: 'string', id: 'Day' },
        // { type: 'string', id: 'Hours' },
        { type: 'string', id: 'Class' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
    ]

    const rows = [
        [
            'Monday',
            'French Class',
            new Date(0, 0, 0, 13, 30, 0),
            new Date(0, 0, 0, 14, 30, 0),
        ],
        [
            'Tuesday',
            'Tamil Class',
            new Date(0, 0, 0, 11, 0, 0),
            new Date(0, 0, 0, 11, 45, 0),
        ],
        [
            'Wednesday',
            'English Class',
            new Date(0, 0, 0, 9, 30, 0),
            new Date(0, 0, 0, 10, 45, 0),
        ],
        [
            'Thursday',
            'Tamil Class',
            new Date(0, 0, 0, 9, 0, 0),
            new Date(0, 0, 0, 10, 0, 0),
        ],
        [
            'Friday',
            'Grammar Class',
            new Date(0, 0, 0, 11, 0, 0),
            new Date(0, 0, 0, 12, 0, 0),
        ],
        [
            'Saturday',
            'English Class',
            new Date(0, 0, 0, 13, 0, 0),
            new Date(0, 0, 0, 14, 0, 0),
        ],
        [
            'Sunday',
            'Grammar Class',
            new Date(0, 0, 0, 9, 30, 0),
            new Date(0, 0, 0, 10, 30, 0),
        ],
    ]

    const data = [columns, ...rows]

    const options = {
        timeline: { showRowLabels: true },
        avoidOverlappingGridLines: true,
        allowHtml: true,
    }

    const getUserProfile = () => {
        const url = config.api.viewTrainer + id
        axios
            .get(url)
            .then(({ data }) => setTrainer(data))
            .catch((err) => {
                console.log(err)
                navigate('/page-not-found', { replace: true })
            })
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <div className="px-6 py-4">
            <div className="flex flex-col w-full space-y-6">
                <div className="w-full">
                    <SectionTitle title="Profile" />
                    <div className="card flex">
                        <div className="w-1/4 section-col flex space-x-6 items-center px-0">
                            <ProfilePicture
                                name={
                                    trainer.first_name + ' ' + trainer.last_name
                                }
                                className="w-16 h-16 text-3xl mb-3"
                            />
                            <div>
                                <p>
                                    <b>
                                        {trainer.first_name} {trainer.last_name}
                                    </b>
                                </p>
                                <p className="text-sm text-gray-500">
                                    {trainer.email}
                                </p>
                                <div className="flex mt-4">
                                    <a
                                        href={`mailto:${trainer.email}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        <MailIcon className="w-3 h-3 mr-2" />
                                        Email
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 section-col space-y-2">
                            <h4 className="font-semibold mb-2">About</h4>
                            <div className="flex justify-start items-center space-x-3">
                                <HomeIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    Coimbatore
                                </p>
                            </div>
                            <div className="flex justify-start items-center space-x-3">
                                <AcademicCapIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    Bachelor of Engineering
                                </p>
                            </div>
                            <div className="flex justify-start items-center space-x-3">
                                <PhoneIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    +91 6379106229
                                </p>
                            </div>
                            <div className="flex justify-start items-center space-x-3">
                                <ChatIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    +91 6379106229
                                </p>
                            </div>
                        </div>
                        <div className="w-1/4 section-col px-4">
                            <h4 className="font-semibold mb-2">Category</h4>
                            <ul className="list-none flex flex-wrap">
                                {trainer?.categories?.map((cat) => (
                                    <li className="text-xs font-normal rounded-sm bg-blue-500 text-white px-1 py-0.5 mr-2 my-1">
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <SectionTitle title="Attendance" />
                        <input
                            className="form-control-sm w-1/3"
                            type="week"
                            name="week"
                        />
                    </div>
                    <div className="card p-0 bg-transparent shadow-none border-0">
                        <Chart
                            chartType="Timeline"
                            data={data}
                            width="100%"
                            height="350px"
                            options={options}
                        />
                    </div>
                    <SectionTitle title="Assigned Classes" />
                    <div className="flex space-x-4">
                        <ListAssignedClasses user_id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTrainer
