import axios from 'axios'
import { Table } from 'flowbite-react'
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
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 rounded-none">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="thead">
                                Name
                            </Table.HeadCell>
                            <Table.HeadCell className="thead">
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell className="thead">
                                Phone
                            </Table.HeadCell>
                            <Table.HeadCell className="thead">
                                Role
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users.map((user, key) => (
                                <Table.Row key={key}>
                                    <Table.Cell>
                                        {user.first_name} {user.last_name}
                                    </Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.phone}</Table.Cell>
                                    <Table.Cell>
                                        <Badge message={roles[user.role]} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default ListUsers
