import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/alert'
import { FingerPrintIcon } from '@heroicons/react/outline'
import { config } from '../config/config'

const Authenticate = () => {
    const [errors, setErrors] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [formData, setFormData] = useState({})
    const { state } = useLocation()
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleFormSubmit = async () => {
        try {
            const { data } = await axios.post(config.api.verifyOtp, {
                id: state.id,
                code: formData.code,
            })
            if (data.verified) {
                navigate('/dashboard')
            } else {
                const error = { error: true, message: 'Authentication Failed' }
                setErrors([error])
            }
        } catch (error) {}
    }

    useEffect(() => {
        if (formData.code) setButtonDisabled(false)
    }, [formData])

    return (
        <div className="container-fluid w-full p-6 bg-blueGray-800 min-h-screen justify-center content-center">
            <div className="container mx-auto flex h-screen items-center">
                <div className="felx w-1/4 mx-auto">
                    <div className="w-full bg-blueGray-100 p-4 rounded-md shadow-black shadow-sm">
                        <div className="p-1 pb-4 text-center uppercase text-lg font-bold">
                            <h5>Authenticate</h5>
                        </div>
                        <hr className="-mx-4" />
                        <div className="text-xs bg-gray-200 text-gray-500 px-4 py-2 -mx-4 text-center">
                            Enter six digit 2FA code to verify
                        </div>
                        {errors &&
                            errors.map((error, key) => (
                                <Alert
                                    key={key}
                                    type="danger"
                                    message={error.msg}
                                />
                            ))}
                        <div className="pt-4">
                            <form>
                                <div className="flex w-full mb-4">
                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Authentication Code"
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control text-center tracking-widest"
                                    />
                                </div>
                                <div className="flex w-full mb-2">
                                    <button
                                        type="button"
                                        disabled={buttonDisabled}
                                        onClick={handleFormSubmit}
                                        className="btn btn-info w-full uppercase"
                                    >
                                        Authenticate
                                        <FingerPrintIcon className="h-5 w-5 ml-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex w-full p-4 text-center text-white font-semibold justify-center">
                        <Link
                            to="/register"
                            className="text-xs uppercase hover:underline"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authenticate
