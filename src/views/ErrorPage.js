import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="space-y-8">
                <InformationCircleIcon className="text-red-400 h-10 w-10 mx-auto" />
                <h1 className="text-center text-6xl font-bold text-gray-500">
                    404
                </h1>
                <h2 className="text-5xl font-semibold">Page Not Found</h2>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default ErrorPage
