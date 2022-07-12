import {
    PresentationChartBarIcon,
    UserIcon,
    UsersIcon,
} from '@heroicons/react/solid'
import { PresentationChartBarIcon as OutlinePresentationChart } from '@heroicons/react/outline'
import React from 'react'

const Stats = ({ data }) => {
    console.log(data)
    return (
        <>
            <section className="text-gray-900">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-3 xl:grid-cols-3">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border-1 border-emerald-300 bg-emerald-50 text-gray-900">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-emerald-300">
                            <UserIcon className="h-9 w-9 text-emerald-600" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none text-emerald-500">
                                {data['all_students']}
                            </p>
                            <p className="capitalize">Total Students</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border-1 border-cyan-300 bg-cyan-50 text-gray-900">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-cyan-300">
                            <UsersIcon className="h-9 w-9 text-cyan-600" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none text-cyan-700">
                                {data['trainers']}
                            </p>
                            <p className="capitalize">Total Trainers</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border-1 border-purple-300 bg-purple-50 text-gray-900">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-purple-400">
                            <PresentationChartBarIcon className="h-9 w-9 text-purple-700" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none text-purple-700">
                                {data['all_classes']}
                            </p>
                            <p className="capitalize">Total Classes</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-gray-900">
                <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
                                <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
                            </svg>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['active_students']}
                            </p>
                            <p>Active Students</p>
                        </div>
                    </div>
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <OutlinePresentationChart className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['active_classes']}
                            </p>
                            <p>Active Classes</p>
                        </div>
                    </div>
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <OutlinePresentationChart className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['scheduled_classes']}
                            </p>
                            <p>Scheduled Classes</p>
                        </div>
                    </div>
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <OutlinePresentationChart className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['in_progress_classes']}
                            </p>
                            <p>Classes In-Progress</p>
                        </div>
                    </div>
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <OutlinePresentationChart className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['completed_classes']}
                            </p>
                            <p>Classes Completed</p>
                        </div>
                    </div>
                    <div className="flex overflow-hidden rounded-lg bg-sky-50 border-1 border-sky-200 text-gray-900">
                        <div className="flex items-center justify-center px-4 bg-sky-200 text-sky-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
                                <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
                            </svg>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-3">
                            <p className="text-2xl font-semibold text-sky-500">
                                {data['active_trainers']}
                            </p>
                            <p>Active Trainers</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Stats
