import { ViewGridAddIcon } from "@heroicons/react/outline";
import { ExternalLinkIcon, UserAddIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "../components/alert";

const AddNewTrainers = () => {
  const [formData, setFormData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [globalActionVisible, setGlobalActionVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const url = "http://localhost:4000/v1/dev/admin/trainer/create";
      const { data } = await axios.post(url, formData);
      if (data) {
        setErrors([]);
        setFormData({});
        fetchTrainers();
      }
    } catch (error) {
      const { data } = error.response;
      if (data) {
        setErrors([data]);
      }
    }
  };

  const fetchTrainers = () => {
    const url = "http://localhost:4000/v1/dev/admin/trainers";
    axios
      .get(url)
      .then(({ data }) => {
        if (data) {
          let filtered = data.filter((t) => +t.invite_status === 0);
          filtered.map((e) => (e.isChecked = false));
          setTrainers(filtered);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAllChecked = (e) => {
    const trainersCheckbox = trainers;
    trainersCheckbox.forEach((o) => (o.isChecked = e.target.checked));
    setTrainers([...trainersCheckbox]);
  };

  const handleCheckboxChange = (e) => {
    const trainersCheckbox = trainers;
    trainersCheckbox.forEach((o) => {
      if (+o.id === +e.target.value) {
        o.isChecked = e.target.checked;
      }
    });
    setTrainers([...trainersCheckbox]);
  };

  const sendInvite = async (id) => {
    try {
      const url = `http://localhost:4000/v1/dev/admin/trainer/send-invite`;
      const { data } = await axios.post(url, { id: [id] });
      if (data) fetchTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  const sendBulkInvite = async () => {
    const selectedTrainers = [];
    trainers.forEach((trainer) => {
      if (trainer.isChecked) selectedTrainers.push(trainer.id);
    });
    try {
      const url = `http://localhost:4000/v1/dev/admin/trainer/send-invite`;
      const { data } = await axios.post(url, { id: selectedTrainers });
      if (data) fetchTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formData.first_name && formData.last_name && formData.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  useEffect(() => {
    const checkedCount = trainers.filter((o) => o.isChecked === true);
    checkedCount.length
      ? setGlobalActionVisible(true)
      : setGlobalActionVisible(false);
  }, [trainers]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="container flex space-x-6 py-4 px-6">
      <div className="form w-1/2 mt-2">
        <div className="w-full mb-4">
          <h4 className="text-gray-500 font-semibold mb-4 ">
            Add New Trainers
          </h4>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm border-1">
          {errors.map((error, key) => (
            <Alert
              key={key}
              type="danger"
              message={error.message}
              className="mb-4"
            />
          ))}
          <div className="w-full flex space-x-4">
            <div className="mb-4 w-1/2">
              <label
                htmlFor="first_name"
                className="block text-gray-500 text-sm mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={formData.first_name ?? ""}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-4 w-1/2">
              <label
                htmlFor="first_name"
                className="block text-gray-500 text-sm mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={formData.last_name ?? ""}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-sm" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email ?? ""}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500" htmlFor="role">
              Role
            </label>
            <select name="role" className="form-control mb-4">
              <option value="trainer">Trainer</option>
            </select>
          </div>
          <button
            className="flex items-center btn btn-info font-normal"
            disabled={buttonDisabled}
            onClick={handleFormSubmit}
          >
            <UserAddIcon className="h-5 w-5 mr-2" /> Create Trainer
          </button>
        </div>
      </div>
      <div className="trainer-list w-1/2 mt-2">
        <div className="w-full flex justify-between">
          <h4 className="text-gray-500 font-semibold mb-4 ">New Trainers</h4>
          {globalActionVisible && (
            <div className="global-action">
              <button
                className="btn btn-success text-xs font-normal px-2 py-1 shadow-none"
                onClick={sendBulkInvite}
              >
                <ExternalLinkIcon className="h-4 w-4 mr-2" />
                Send invite
              </button>
            </div>
          )}
        </div>
        {trainers.length ? (
          <div className="overflow-hidden sm:rounded-lg">
            <table className="items-center w-full bg-transparent border-collapse border-1 shadow-sm">
              <thead>
                <tr className="">
                  <th className="text-left px-6 py-4 text-xs text-gray-600 border-b-1 border-sky-200 bg-sky-100">
                    <input
                      type="checkbox"
                      name="checkbox"
                      onClick={handleAllChecked}
                    />
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-sky-600 border-b-1 border-sky-200 bg-sky-100 font-semibold uppercase">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-sky-600 border-b-1 border-sky-200 bg-sky-100 font-semibold uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {trainers.map((trainer, key) => (
                  <tr key={key} className="hover:bg-slate-100">
                    <td className="p-4 px-6 align-middle text-sm whitespace-nowrap">
                      <input
                        type="checkbox"
                        name={`checkbox-${key}`}
                        checked={trainer.isChecked}
                        value={trainer.id}
                        onChange={(e) => {}}
                        onClick={handleCheckboxChange}
                      />
                    </td>
                    <td className="p-4 px-6 align-middle text-sm whitespace-nowrap">
                      <p className="font-normal text-sm text-gray-700">{`${trainer.first_name} ${trainer.last_name}`}</p>
                    </td>
                    <td className="p-4 px-6 align-middle text-sm whitespace-nowrap">
                      <button
                        className="btn btn-success text-xs font-normal px-2 py-1 shadow-none"
                        onClick={() => sendInvite(trainer.id)}
                      >
                        <ExternalLinkIcon className="w-4 h-4 mr-2" />
                        Send invite
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex bg-slate-100 p-4 h-40 rounded-md border-2 border-dashed border-gray-300 justify-center items-center">
            <div>
              <ViewGridAddIcon className="h-8 w-8 text-slate-400 block mx-auto" />
              <h2 className="block text-slate-400 text-center my-2">
                No new trainers here
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewTrainers;
