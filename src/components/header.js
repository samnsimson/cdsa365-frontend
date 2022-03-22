import React from 'react'
import {
    MenuAlt1Icon,
    UserIcon,
    CogIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, toggleLogin } from '../models'
import { Menu } from '@headlessui/react'

const userMenu = [
    {
        id: 1,
        name: 'Account',
        icon: (
            <ShieldCheckIcon className="h-5 w-5 text-gray-500 group-hover:text-white" />
        ),
    },
    {
        id: 2,
        name: 'Profile',
        icon: (
            <UserCircleIcon className="h-5 w-5 text-gray-500 group-hover:text-white" />
        ),
    },
    {
        id: 3,
        name: 'Sign out',
        icon: (
            <LogoutIcon className="h-5 w-5 text-gray-500 group-hover:text-white" />
        ),
    },
]

const Header = () => {
    const {
        dashboard: { minimiseSidebar },
        user: { currentUser },
    } = useSelector((state) => state)
    const dispatch = useDispatch()
    return (
        <div className="flex items-center justify-between h-20 px-4 w-full border-b-1 border-gray-300 font-sans">
            <div className="leftSection flex items-center">
                <MenuAlt1Icon
                    className="h-5 w-5 text-gray-500 hover:text-slate-700 mr-2 cursor-pointer"
                    fill="currentColor"
                    onClick={() => dispatch(toggleSidebar(!minimiseSidebar))}
                />
                <p className="font-bold">Dashboard</p>
            </div>
            <div className="middleSection w-1/3">
                {/* <input
                    type="text"
                    name="search"
                    placeholder="search"
                    className="w-full rounded-lg form-control"
                /> */}
            </div>
            <div className="rightSection flex items-center space-x-5">
                <CogIcon
                    className="h-5 w-5 text-gray-500 hover:text-sky-500 cursor-pointer"
                    fill="currentColor"
                />
                <Menu as="div" className="relative">
                    {({ open }) => (
                        <>
                            <Menu.Button className="inline-flex space-x-2">
                                <UserIcon
                                    className="h-5 w-5 text-gray-500 hover:text-sky-500 cursor-pointer"
                                    fill="currentColor"
                                />
                                <p>{`${currentUser?.first_name} ${currentUser?.last_name}`}</p>
                            </Menu.Button>
                            {open && (
                                <Menu.Items
                                    className={`origin-top-right absolute right-0 mt-8 w-44 p-3 bg-white space-y-3`}
                                >
                                    {userMenu.map((item) => (
                                        <Menu.Item
                                            key={item.id}
                                            className="group flex hover:cursor-pointer  space-x-2 items-center hover:bg-sky-500 hover:text-white p-2 rounded"
                                            onClick={() =>
                                                item.id === 3 &&
                                                dispatch(toggleLogin(false))
                                            }
                                        >
                                            {({ active }) => (
                                                <div>
                                                    {item.icon}
                                                    <p className={`text-md`}>
                                                        {item.name}
                                                    </p>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            )}
                        </>
                    )}
                </Menu>
            </div>
        </div>
    )
}

export default Header
