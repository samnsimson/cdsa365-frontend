import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Dashboard = () => {
    return (
        <div className={`grid grid-cols-10 max-h-screen`}>
            <div className={`col-span-2 relative overflow-hidden`}>
                <Sidebar className="flex-1 overflow-y-scroll" />
            </div>
            <div className={`col-span-8`}>
                <div className="h-screen overflow-y-scroll bg-slate-50">
                    <Header className="bg-white" />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
