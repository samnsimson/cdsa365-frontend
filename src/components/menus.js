import React from "react";
import {
    AcademicCapIcon,
    BookOpenIcon,
    ChevronRightIcon,
    PlusIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/solid";

const Menus = () => {
    return (
        <div>
            <ul className="list-none">
                <li className="p-2">
                    <div className="w-full font-semibold">
                        <p>Trainers</p>
                    </div>
                    <div>
                        <ul className="py-2">
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <PlusIcon className="h-4 w-4" />
                                    <p>Add New </p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <AcademicCapIcon className="h-4 w-4" />
                                    <p>All Trainers</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <UserGroupIcon className="h-4 w-4" />
                                    <p>Trainer Category</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="p-2">
                    <div className="w-full font-semibold">
                        <p>Students</p>
                    </div>
                    <div>
                        <ul className="py-2">
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <PlusIcon className="h-4 w-4" />
                                    <p>Add New </p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <UserIcon className="h-4 w-4" />
                                    <p>All Students</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <UserGroupIcon className="h-4 w-4" />
                                    <p>Student Category</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                        </ul>
                    </div>
                </li>
                <li className=" p-2">
                    <div className="w-full font-semibold">
                        <p>Classes</p>
                    </div>
                    <div>
                        <ul className="py-2">
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <PlusIcon className="h-4 w-4" />
                                    <p>Add New </p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <BookOpenIcon className="h-4 w-4" />
                                    <p>All Classes</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                            <li className="p-2 flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-md">
                                <div className="flex justify-start items-center space-x-2">
                                    <UserGroupIcon className="h-4 w-4" />
                                    <p>Class Category</p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Menus;
