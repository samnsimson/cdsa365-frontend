import React, { Fragment, useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/solid'
import moment from 'moment'

const AddClassDropdown = ({
    classes,
    selectedClass,
    setSelectedClass,
    onClick,
}) => {
    const [query, setQuery] = useState('')
    const [filteredClasses, setFilteredClasses] = useState(classes)

    useEffect(() => {
        setFilteredClasses(
            query === ''
                ? classes
                : classes.filter((cls) =>
                      cls.title.toLowerCase().includes(query.toLowerCase())
                  )
        )
    }, [query])

    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Choose a class
            </div>
            <Combobox value={selectedClass} onChange={setSelectedClass}>
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(cls) => cls.title}
                    className="form-control"
                    placeholder="Type class title to select a class"
                />
                <Combobox.Options className="max-h-64 overflow-y-scroll shadow mt-4">
                    {filteredClasses.map((cls, i) => (
                        <Combobox.Option
                            key={i}
                            value={cls}
                            disabled={cls.disabled}
                            as={Fragment}
                            // className="py-2 px-4 cursor-pointer text-sm hover:bg-yellow-50 hover:text-yellow-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100"
                        >
                            {({ active, selected }) => (
                                <li
                                    className={`flex space-x-3 p-2 cursor-pointer text-sm ${
                                        active
                                            ? 'bg-blue-100 text-blue-500'
                                            : 'bg-white text-black'
                                    } ${
                                        selected
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : ''
                                    }`}
                                >
                                    <span className="w-5">
                                        {(selected || active) && (
                                            <CheckIcon className="w-5 h-5" />
                                        )}
                                    </span>
                                    <span className="block truncate">
                                        <span className="flex flex-col space-y-1">
                                            <span>{cls.title}</span>
                                            <span className="text-xs text-gray-500 flex space-x-4">
                                                <span>
                                                    {moment(
                                                        cls.start_time
                                                    ).format('LL')}
                                                </span>
                                                <span>
                                                    {moment(
                                                        cls.start_time
                                                    ).format('LT') +
                                                        ' - ' +
                                                        moment(
                                                            cls.end_time
                                                        ).format('LT')}
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
            <button
                className="btn btn-info mx-auto"
                disabled={!Boolean(selectedClass)}
                onClick={onClick}
            >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add to class
            </button>
        </div>
    )
}

export default AddClassDropdown
