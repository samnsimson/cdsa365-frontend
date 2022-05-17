import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/alert'
import axios from 'axios'
import { config } from '../config/config'
import Loader from '../components/loader'

const ForgotPassword = () => {
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [formData, setFormData] = useState({ portal: 'admin' })

    const handleOnChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = async () => {
        try {
            setLoading(true)
            const url = config.api.sendResetPasswordLink
            const { data } = await axios.post(url, formData)
            if (data) setInfo(data.message)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const cond = 'email' in formData && formData.email.length >= 5
        setButtonDisabled(!cond)
    }, [formData])

    useEffect(() => {
        if (info && error) setError(null)
    }, [info])

    useEffect(() => {
        if (error && info) setInfo(null)
    }, [error])

    return (
        <div className="container-fluid w-full bg-blueGray-800 max-h-screen justify-center content-center">
            <div className="container mx-auto flex h-screen items-center">
                <div className="felx w-1/4 mx-auto">
                    <div className="w-full bg-blueGray-100 p-4 rounded-sm shadow-black shadow-sm">
                        <div className="p-1 pb-4 text-center uppercase text-lg font-bold">
                            <h5>Reset password</h5>
                        </div>
                        <hr className="-mx-4" />
                        <p className="text-xs text-gray-500 my-3 text-center">
                            Enter your email registered with us. If the email is
                            found, we will send you a password reset link to
                            your registered email address.
                        </p>
                        <hr className="-mx-4" />
                        {error && <Alert type="danger" message={error} />}
                        {info && <Alert type="success" message={info} />}
                        <div className="pt-4">
                            <form>
                                <div className="flex w-full mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        value={formData.email || ''}
                                        onChange={handleOnChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="flex w-full mb-2">
                                    <button
                                        type="button"
                                        disabled={buttonDisabled}
                                        onClick={handleFormSubmit}
                                        className="btn btn-info w-full uppercase text-sm"
                                    >
                                        {loading ? (
                                            <Loader
                                                color="#fff"
                                                loading={loading}
                                            />
                                        ) : (
                                            'Send reset password link'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex w-full p-4 text-center text-white font-semibold justify-center">
                        <Link
                            to="/login"
                            className="text-xs uppercase hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
