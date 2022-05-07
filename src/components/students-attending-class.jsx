import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const StudentsAttendingClass = ({ class_id }) => {
    const [students, setStudents] = useState([])

    const fetchStudentsAttendingClass = (class_id) => {
        axios
            .get(config.api.getStudentsInClass + `/${class_id}`)
            .then(({ data }) => setStudents(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (class_id) fetchStudentsAttendingClass(class_id)
    }, [class_id])

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="thead py-2">ID</th>
                    <th className="thead py-2">Name</th>
                    <th className="thead py-2">Email</th>
                    <th className="thead py-2">Phone</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id} className="border-b last:border-b-0">
                        <td className="p-2 text-sm">{student.id}</td>
                        <td className="p-2 text-sm">{student.student_name}</td>
                        <td className="p-2 text-sm">{student.email}</td>
                        <td className="p-2 text-sm">{student.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default StudentsAttendingClass
