import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import axios from "axios";
// import Alert from "../components/alert";
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

const AuthSetup = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()

    // const handleOnChange = (e) => {};

    useEffect(() => {}, [])

    return (
        <div className="container-fluid w-full p-6 bg-blueGray-800 min-h-screen justify-center content-center">
            <div className="container mx-auto flex h-screen items-center">
                <div className="felx w-1/4 mx-auto">
                    <div className="w-full bg-blueGray-100 p-4 rounded-sm shadow-black shadow-sm">
                        <div className="p-1 pb-4 justify-center">
                            <img
                                src={state?.qrcode ?? ''}
                                alt="qr code"
                                className="m-auto"
                            />
                        </div>
                        <hr className="-mx-4" />
                        <div className="text-xs bg-gray-200 text-gray-500 px-4 py-2 -mx-4 text-center">
                            Setup 2-Factor Authentication
                        </div>
                        <div className="pt-4 text-center text-md font-normal">
                            <p>
                                Scan the QR Code with 2-Factor Authentication
                                app like <b>Google Authenticator</b> to setup
                                Authentication and click continue
                            </p>
                            <div className="py-2">
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="checkbox"
                                    id="flexCheckDefault"
                                    onChange={(e) =>
                                        setButtonDisabled(!e.target.checked)
                                    }
                                />
                                <label
                                    className="form-check-label inline-block text-gray-800"
                                    for="flexCheckDefault"
                                >
                                    2FA setup completed
                                </label>
                            </div>
                            <button
                                className="btn btn-info w-full uppercase"
                                disabled={buttonDisabled}
                                onClick={() => navigate('/login')}
                            >
                                Continue{' '}
                                <ArrowNarrowRightIcon className="h-5 w-5 ml-2" />
                            </button>
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

export default AuthSetup
