import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../components/alert";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../models";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4000/v1/dev/admin/login`;
      const { data } = await axios.post(url, formData);
      if (data) {
        setUserId(data.id);
        dispatch(toggleLogin(true));
        navigate("/authenticate", { state: { id: data.id } });
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data?.error && data?.errors?.length) setErrors(data.errors);
        else if (data?.error && data?.message)
          setErrors([{ msg: data.message }]);
      }
    }
  };

  useEffect(() => {
    if (formData.email && formData.password) {
      setButtonDisabled(false);
    }
  }, [formData]);

  useEffect(() => {
    if (errors.length) setErrors([]);
  }, [userId, errors.length]);

  return (
    <div className="container-fluid w-full bg-blueGray-800 max-h-screen justify-center content-center">
      <div className="container mx-auto flex h-screen items-center">
        <div className="felx w-1/4 mx-auto">
          <div className="w-full bg-blueGray-100 p-4 rounded-md shadow-black shadow-sm">
            <div className="p-1 pb-4 text-center uppercase text-lg font-bold">
              <h5>Sign in</h5>
            </div>
            <hr className="-mx-4" />
            {errors &&
              errors.map((error, key) => (
                <Alert key={key} type="danger" message={error.msg} />
              ))}
            <div className="pt-4">
              <form>
                <div className="flex w-full mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="flex w-full mb-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="flex w-full mb-2">
                  <button
                    type="button"
                    disabled={buttonDisabled}
                    onClick={handleFormSubmit}
                    className="btn btn-info w-full uppercase"
                  >
                    Sign in <ArrowNarrowRightIcon className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex w-full p-4 text-center text-white font-semibold justify-between">
            <Link to="/register" className="text-xs uppercase hover:underline">
              Create an account
            </Link>
            <Link to="/login" className="text-xs uppercase hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
