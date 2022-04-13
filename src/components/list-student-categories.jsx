import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { config } from '../config/config'

const ListStudentCategories = ({ formData, handleChange }) => {
    const [categories, setCategories] = useState([])

    const fetchStudentCategories = () => {
        axios
            .get(config.api.getCategory + '/student')
            .then(({ data }) => setCategories(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchStudentCategories()
    }, [])

    return (
        <div>
            <label
                htmlFor="students"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Choose student category for this class
            </label>
            <select
                className="form-control"
                name="studentCategory"
                value={formData.studentCategory ?? ''}
                onChange={handleChange}
            >
                <option value={null}>Select a category</option>
                {categories.map((cat, i) => (
                    <option key={i} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Assign students to the class. If no student category listed,
                please create one{' '}
                <Link
                    to="/dashboard/trainers/add-new"
                    className="underline text-blue-500"
                >
                    here
                </Link>
            </p>
        </div>
    )
}

export default ListStudentCategories
