import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-10">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-8">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
