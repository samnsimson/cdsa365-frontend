import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'

const ListRemarks = ({ class_id }) => {
    const [remarks, setRemarks] = useState([])

    const fetchRemarks = async (class_id) => {
        const { get } = axios
        const url = config.api.fetchRemarks + `/${class_id}`
        get(url)
            .then(({ data }) => setRemarks(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchRemarks(class_id)
    }, [class_id])

    return remarks.map((remark) => {
        return (
            <div className="border bg-gray-200 rounded p-4 mb-2">
                {remark.remark}
            </div>
        )
    })
}

export default ListRemarks
