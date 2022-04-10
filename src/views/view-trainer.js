import {
    HomeIcon,
    MailIcon,
    AcademicCapIcon,
    PhoneIcon,
    ChatIcon,
    GlobeAltIcon,
    LocationMarkerIcon,
    MapIcon,
} from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfilePicture from '../components/profile-picture'
import { config } from '../config/config'
import { Chart } from 'react-google-charts'
import SectionTitle from '../components/section-title'
import ListAssignedClasses from '../components/list-assigned-classes'
import ResourceTimeline from '../components/resource-timeline'
import moment from 'moment-timezone'
import MonthlyPayoutData from '../components/monthly-payout-data'
import Card from '../components/card'

const ViewTrainer = () => {
    const [trainer, setTrainer] = useState({})
    const [selectedWeek, setSelectedWeek] = useState(() => {
        let currentTime = moment()
        let year = currentTime.format('YYYY')
        let week = currentTime.isoWeek()
        let selected = `${year}-W${week}`
        return selected
    })
    const [selectedMonth] = useState(() => moment(selectedWeek).month() + 1)
    const [selectedYear] = useState(() => moment(selectedWeek).year())
    const { id } = useParams()
    const navigate = useNavigate()

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
                        <div className="w-1/3 section-col flex space-x-6 items-center px-0">
                            <ProfilePicture
                                name={
                                    trainer.first_name + ' ' + trainer.last_name
                                }
                                className="w-24 h-24 text-3xl mb-3"
                            />
                            <div className="space-y-2 flex-grow">
                                <div className="flex justify-start items-center space-x-3">
                                    <p className="font-bold">
                                        {trainer.first_name} {trainer.last_name}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center space-x-3">
                                    <AcademicCapIcon
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                    />
                                    <p className="text-sm text-slate-500">
                                        {trainer.education}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center space-x-3">
                                    <MailIcon
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                    />
                                    <p className="text-sm text-slate-500">
                                        {trainer.email}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center space-x-3">
                                    <PhoneIcon
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                    />
                                    <p className="text-sm text-slate-500">
                                        +91 {trainer.phone}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center space-x-3">
                                    <ChatIcon
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                    />
                                    <p className="text-sm text-slate-500">
                                        +91 {trainer.whatsapp}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 section-col space-y-2">
                            <h4 className="font-semibold mb-2">About</h4>

                            <div className="flex justify-start items-center space-x-3">
                                <HomeIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    {trainer.address_one ?? '-'}
                                </p>
                            </div>
                            {trainer.address_two && (
                                <div className="flex justify-start items-center space-x-3">
                                    <HomeIcon
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                    />
                                    <p className="text-sm text-slate-500">
                                        {trainer.address_two ?? '-'}
                                    </p>
                                </div>
                            )}
                            <div className="flex justify-start items-center space-x-3">
                                <LocationMarkerIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    {trainer.city ?? '-'}
                                </p>
                            </div>
                            <div className="flex justify-start items-center space-x-3">
                                <MapIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    {trainer.district ?? '-'}
                                </p>
                            </div>
                            <div className="flex justify-start items-center space-x-3">
                                <GlobeAltIcon
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                />
                                <p className="text-sm text-slate-500">
                                    {trainer.state ?? '-'},{' '}
                                    {trainer.pincode ?? '-'}
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 px-4">
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
                <div className="w-full space-y-6">
                    <div className="flex justify-between items-center">
                        <SectionTitle title="Attendance" />
                        <input
                            className="form-control-sm w-1/3"
                            type="week"
                            name="week"
                            value={selectedWeek}
                            onChange={(e) => setSelectedWeek(e.target.value)}
                        />
                    </div>
                    <div className="card p-0 bg-transparent shadow-none border-0">
                        <ResourceTimeline
                            id={id}
                            selectedWeek={selectedWeek}
                            selectedMonth={selectedMonth}
                            salary={trainer.salary}
                        />
                    </div>
                    <div className="card p-0 bg-transparent shadow-none border-0">
                        <Card>
                            <MonthlyPayoutData
                                id={id}
                                year={selectedYear}
                                salary={trainer.salary}
                            />
                        </Card>
                    </div>
                    <div>
                        <SectionTitle title="Assigned Classes" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <ListAssignedClasses user_id={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTrainer
