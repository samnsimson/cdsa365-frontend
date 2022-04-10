import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'
import moment from 'moment-timezone'
import {
    BanIcon,
    CalendarIcon,
    ClockIcon,
    EyeIcon,
} from '@heroicons/react/solid'
import Placeholder from './placeholder'

const ListAssignedClasses = ({ user_id }) => {
    const [classes, setClasses] = useState([])

    const unassignTrainer = (trainer, class_id) => {
        const url = config.api.unassignClassesToTrainer
        const params = `/${trainer}` + `/${class_id}`
        const endpoint = url + params
        axios
            .delete(endpoint)
            .then(() => getClasses())
            .catch((err) => console.log(err))
    }

    const getClasses = () => {
        axios
            .get(config.api.getAssignedClasses + '/' + user_id)
            .then(({ data }) => setClasses(data))
    }

    useEffect(() => {
        getClasses()
    }, [user_id])

    return classes.length > 0 ? (
        classes.map((c, i) => (
            <div className="w-full" key={i}>
                <div className="card flex flex-col space-y-4 justify-between min-h-full">
                    <div className="flex flex-col space-y-4">
                        <div>
                            <p className="text-slate-700 text-sm font-bold">
                                {c.title}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">
                                {c.description.substr(0, 125) + '...'}
                            </p>
                        </div>
                        <div>
                            <p className="flex items-center text-sm ">
                                <CalendarIcon
                                    className="w-4 h-4 mr-2 text-slate-400"
                                    fill="currentColor"
                                />
                                {moment(c.start_time).format('LL')}
                            </p>
                        </div>
                        <div>
                            <p className="flex items-center text-sm ">
                                <ClockIcon
                                    className="w-4 h-4 mr-2 text-slate-400"
                                    fill="currentColor"
                                />
                                {moment(c.start_time).format('LT')} -{' '}
                                {moment(c.end_time).format('LT')}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <button className="btn-sm btn-info">
                            <EyeIcon className="w-4 h-4 mr-2" />
                            View Class
                        </button>
                        <button
                            className="btn-sm btn-danger"
                            onClick={() => unassignTrainer(user_id, c.id)}
                        >
                            <BanIcon className="w-4 h-4 mr-2" />
                            Unassign
                        </button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="card w-full">
            <Placeholder message="No classes assigned" />
        </div>
    )
}

export default ListAssignedClasses
