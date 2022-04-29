import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import Emoji from '../components/emoji'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { config } from '../config/config'
import { capitalize } from '../helpers/helper'

const generateGreetings = () => {
    var currentHour = moment().format('HH')
    console.log(currentHour)
    if (currentHour >= 3 && currentHour < 12) {
        return 'Good Morning'
    } else if (currentHour >= 12 && currentHour < 15) {
        return 'Good Afternoon'
    } else if (currentHour >= 15 && currentHour < 20) {
        return 'Good Evening'
    } else if (currentHour >= 20 && currentHour < 3) {
        return 'Good Night'
    } else {
        return 'Hello'
    }
}

const Home = () => {
    const {
        user: { currentUser },
    } = useSelector((state) => state)
    const [report, setReport] = useState({})

    const getCounts = () => {
        axios
            .get(config.api.getCountReport)
            .then(({ data }) => setReport(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getCounts()
    }, [])

    return (
        <div className="px-6 py-4 space-y-4">
            <div className="greeting px-6 py-4 bg-indigo-200 rounded-sm w-full">
                <p className="font-bold text-2xl">
                    {`${generateGreetings()}, ${currentUser.first_name}! `}
                    <Emoji symbol="👋" label="hi!" />
                </p>
                <p className="text-sm">
                    Here's what is happening with your website today!
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(report).map(([key, value], i) => (
                    <div
                        key={i}
                        className="rounded border-1 bg-white flex justify-between items-center"
                    >
                        <h4 className="font-bold text-sm text-gray-600 p-4">
                            {capitalize(key).split('_').join(' ')}
                        </h4>
                        <p className="font-bold text-2xl p-4 border-l-1">
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
