import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="space-y-8 flex flex-col items-center justify-center">
                <InformationCircleIcon className="text-red-400 h-10 w-10 mx-auto" />
                <h1 className="text-center text-6xl font-bold text-gray-500">
                    404
                </h1>
                <h2 className="text-5xl font-semibold">Page Not Found</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" /> Go Back
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
