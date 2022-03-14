import React from "react";
import { MenuAlt1Icon, UserIcon, CogIcon } from "@heroicons/react/solid";

const Header = () => {
    return (
        <div className="flex items-center justify-between h-20 px-4 w-full border-b-1 border-gray-300 font-sans">
            <div className="leftSection flex items-center">
                <MenuAlt1Icon
                    className="h-5 w-5 text-gray-500 hover:text-slate-700 mr-2"
                    fill="currentColor"
                />
                <p className="font-bold">Dashboard</p>
            </div>
            <div className="middleSection w-1/3">
                <input
                    type="text"
                    name="search"
                    placeholder="search"
                    className="w-full rounded-full form-control"
                />
            </div>
            <div className="rightSection flex items-center space-x-5">
                <CogIcon
                    className="h-5 w-5 text-gray-500 hover:text-sky-500"
                    fill="currentColor"
                />
                <UserIcon
                    className="h-5 w-5 text-gray-500 hover:text-sky-500"
                    fill="currentColor"
                />
            </div>
        </div>
    );
};

export default Header;
