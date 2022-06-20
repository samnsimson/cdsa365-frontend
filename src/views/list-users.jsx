import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Badge from '../components/badge'
import Card from '../components/card'
import { config } from '../config/config'

const roles = {
    super: 'Super Admin',
    admin: 'Admin',
    manager: 'Manager',
    editor: 'Editor',
}

const ListUsers = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const url = config.api.getAllUsers
        const { data } = await axios.get(url)
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="px-6 py-4">
            <Card title={'Users'} bodyClass="p-0">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
                    <table className="items-center min-w-full bg-transparent border-collapse border-1 shadow-sm">
                        <thead>
                            <tr>
                                <th className="thead">Name</th>
                                <th className="thead">Email</th>
                                <th className="thead">Phone</th>
                                <th className="thead">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map((user, key) => (
                                <tr key={key}>
                                    <td className="p-2">
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.phone}</td>
                                    <td className="p-2">
                                        <Badge message={roles[user.role]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default ListUsers
