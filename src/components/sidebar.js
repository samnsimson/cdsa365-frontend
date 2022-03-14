import React from "react";
import Menus from "./menus";

const Sidebar = () => {
    return (
        <div className="w-full h-screen bg-slate-800 p-4 text-white font-default">
            <div className="flex items-center space-x-4 h-20 max-h-full -mt-4 -mx-4 px-4">
                <h4>CDSA 365</h4>
            </div>
            <div>
                <Menus />
            </div>
        </div>
    );
};

export default Sidebar;
