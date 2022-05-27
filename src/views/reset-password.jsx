import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../components/alert'
import Loader from '../components/loader'
import { config } from '../config/config'

const ResetPassword = () => {
    const { token } = useParams()
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [verifying, setVerifying] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    })

    const verifyToken = (token) => {
        axios
            .get(config.api.verifyToken + `/${token}`)
            .then(({ data }) => setUserData(data))
            .catch((err) => console.log(err))
            .finally(() => setVerifying(false))
    }

    const handleOnChange = (e) => {
        setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = () => {
        let errorCount = 0
        setLoading(true)
        try {
            Object.values(formData).map((value) => !value && errorCount++)
            if (!errorCount) {
                if (error) setError(null)
                if (formData.newPassword !== formData.confirmPassword) {
                    setError('Passwords does not match')
                } else {
                    axios
                        .post(config.api.updatePassword, {
                            entity: 'admin',
                            id: userData.id,
                            password: formData.confirmPassword,
                        })
                        .then(() => setInfo('Password upated'))
                        .catch((err) => setError(err.message))
                }
            } else {
                setError('All fields are required')
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const { newPassword, confirmPassword } = formData
        const cond = newPassword.length && confirmPassword.length
        setButtonDisabled(!cond)
    }, [formData])

    useEffect(() => {
        verifyToken(token)
    }, [token])

    return (
        <div className="container-fluid w-full bg-blueGray-800 max-h-screen justify-center content-center">
            <div className="container mx-auto flex h-screen items-center">
                {verifying ? (
                    <div className="w-full flex items-center justify-center">
                        <h1 className="text-3xl font-black text-white text-center">
                            Verifying...
                        </h1>
                    </div>
                ) : (
                    <div className="felx w-1/4 mx-auto">
                        <div className="w-full bg-blueGray-100 p-4 rounded-sm shadow-black shadow-sm">
                            <div className="p-1 pb-4 text-center uppercase text-lg font-bold">
                                <h5>Reset password</h5>
                            </div>
                            <hr className="-mx-4" />
                            {error && <Alert type="danger" message={error} />}
                            {info && <Alert type="success" message={info} />}
                            <div className="pt-4">
                                <form>
                                    <div className="flex w-full mb-4">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="New Password"
                                            value={formData.newPassword || ''}
                                            onChange={handleOnChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="flex w-full mb-4">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={
                                                formData.confirmPassword || ''
                                            }
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
                                                'Change password'
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
                )}
            </div>
        </div>
    )
}

export default ResetPassword
