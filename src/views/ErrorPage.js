import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

const ErrorPage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div>
                <InformationCircleIcon className="text-red-400" />
                <h1 className="text-center text-6xl">404</h1>
                <h2 className="text-5xl">Page Not Found</h2>
            </div>
        </div>
    )
}

export default ErrorPage
