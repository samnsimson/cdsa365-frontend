import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { config } from '../config/config'

const EmailVerify = () => {
    const [error, setError] = useState(null)
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const url = config.api.verifyEmail + `/${token}`
        axios
            .get(url)
            .then(({ data }) => {
                const { verified, message } = data
                if (verified) {
                    navigate('/', { replace: true })
                } else {
                    setError(message)
                }
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [token])

    return <div>EmailVerify token: {error && error}</div>
}

export default EmailVerify
