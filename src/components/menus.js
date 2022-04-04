import React from 'react'
import {
    AcademicCapIcon,
    BookOpenIcon,
    ChevronRightIcon,
    PlusIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

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
                            <Link to="dashboard/trainers/add-new">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <PlusIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>Add New </p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                            <Link to="dashboard/trainers/view-all">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <AcademicCapIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>All Trainers</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                            <Link to="dashboard/category/trainer">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>Trainer Category</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                        </ul>
                    </div>
                </li>
                <li className="p-2">
                    <div className="w-full font-semibold">
                        <p>Students</p>
                    </div>
                    <div>
                        <ul className="py-2">
                            {/* <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                <div className="flex justify-start items-center space-x-2">
                                    <PlusIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                    <p>Add New </p>
                                </div>
                                <ChevronRightIcon className="h-5 w-5" />
                            </li> */}
                            <Link to="/dashboard/students/view-all">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <UserIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>All Students</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                            <Link to="/dashboard/category/student">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>Student Category</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                        </ul>
                    </div>
                </li>
                <li className=" p-2">
                    <div className="w-full font-semibold">
                        <p>Classes</p>
                    </div>
                    <div>
                        <ul className="py-2">
                            <Link to="dashboard/classes/add-new">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <PlusIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>Add New </p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                            <Link to="dashboard/classes/view-all">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <BookOpenIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>All Classes</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                            <Link to="dashboard/category/class">
                                <li className="p-2 group flex justify-between text-sm text-gray-400 hover:bg-sky-500 hover:text-white rounded-sm">
                                    <div className="flex justify-start items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5 text-yellow-500 group-hover:text-white" />
                                        <p>Class Category</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </li>
                            </Link>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Menus
