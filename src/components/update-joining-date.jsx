import axios from 'axios'
import moment from 'moment-timezone'
import React, { useState } from 'react'
import { config } from '../config/config'

const UpdateJoiningDate = ({ joining_date, student_id, callback }) => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const [joiningDate, setJoiningDate] = useState(
        moment(joining_date).format('YYYY-MM-DD')
    )

    const updateDate = () => {
        axios
            .put(config.api.updateStudent + `/${student_id}`, {
                created_at: moment(joiningDate).format(dateFormat),
            })
            .then(() => callback())
            .catch((err) => console.log(err))
    }

    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Update joining date
            </div>
            <div>
                <input
                    type="date"
                    name="created_at"
                    className="form-control"
                    onChange={(e) => setJoiningDate(e.target.value)}
                    value={
                        joiningDate ||
                        moment().tz('Asia/Kolkata').format('YYYY-MM-DD')
                    }
                />
            </div>
            <div className="flex justify-center">
                <button
                    className="btn btn-info"
                    onClick={updateDate}
                    disabled={joiningDate === null}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default UpdateJoiningDate
