import React from 'react'
import moment from 'moment-timezone'
import Emoji from '../components/emoji'
import { useSelector } from 'react-redux'

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

    return (
        <div className="px-6 py-4">
            <div className="greeting px-6 py-4 bg-indigo-200 rounded-sm w-full">
                <p className="font-bold text-2xl">
                    {`${generateGreetings()}, ${currentUser.first_name}! `}
                    <Emoji symbol="👋" label="hi!" />
                </p>
                <p className="text-sm">
                    Here's what is happening with your website today!
                </p>
            </div>
        </div>
    )
}

export default Home
