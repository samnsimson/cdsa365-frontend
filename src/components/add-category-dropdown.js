import React, { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon, SelectorIcon } from '@heroicons/react/solid'
import { config } from '../config/config'
import axios from 'axios'

const AddCategoryDropdown = (props) => {
    const { userList, callback } = props
    const defaultItem = { name: 'Select a category', disabled: true }
    const [categories, setCategories] = useState([defaultItem])
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const [loading, setLoading] = useState(false)

    const fetchCategories = async () => {
        try {
            const url = config.api.getCategory + '/trainer'
            const { data } = await axios.get(url)
            if (data.length) setCategories((state) => [...state, ...data])
        } catch (error) {
            console.log(error)
        }
    }

    const addToCategory = async () => {
        try {
            setLoading(true)
            const url = config.api.addUserToCategory + '/trainer'
            const { data } = await axios.post(url, {
                cat_id: selectedCategory.id,
                user_list: userList.map((user) => user.id),
            })
            if (data) {
                callback()
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
        return () => setCategories([defaultItem])
    }, [])

    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Choose a category
            </div>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <Listbox.Button className="flex justify-between item-center p-2 w-full rounded-sm border-2 border-gray-400">
                    <p>{selectedCategory.name}</p>
                    <SelectorIcon
                        className="w-5 h-5 text-gray-400 hover:text-sky-500"
                        fill="currentColor"
                    />
                </Listbox.Button>

                <Listbox.Options className="listbox-option">
                    {categories.map((category) => (
                        <Listbox.Option
                            key={category.id}
                            className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                    active
                                        ? 'text-amber-900 bg-amber-100'
                                        : 'text-gray-900'
                                }`
                            }
                            value={category}
                            disabled={category.disabled ?? false}
                        >
                            {({ selected }) => (
                                <>
                                    <span
                                        className={`block truncate ${
                                            selected
                                                ? 'font-medium'
                                                : 'font-normal'
                                        }`}
                                    >
                                        {category.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            <button
                className="btn btn-info mx-auto"
                disabled={selectedCategory.disabled ?? loading ?? false}
                onClick={addToCategory}
            >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add to category
            </button>
        </div>
    )
}

export default AddCategoryDropdown
