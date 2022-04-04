import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, PlusCircleIcon, SelectorIcon } from '@heroicons/react/solid'

const AddCategoryDropdown = (props) => {
    const { categories, selectedCategory, setSelectedCategory, onClick } = props
    return (
        <div className="space-y-4">
            <div className="bg-blue-100 p-3 -mt-6 -mx-6 text-center font-semibold uppercase text-sky-800">
                Choose a category
            </div>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <Listbox.Button className="flex justify-between item-center p-2 w-full rounded-md border-2 border-gray-400">
                    <p>{selectedCategory.name}</p>
                    <SelectorIcon
                        className="w-5 h-5 text-gray-400 hover:text-sky-500"
                        fill="currentColor"
                    />
                </Listbox.Button>

                <Listbox.Options className="listbox-option">
                    {categories.map((category, key) => (
                        <Listbox.Option
                            key={key}
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
                disabled={selectedCategory.disabled ?? false}
                onClick={onClick}
            >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add to category
            </button>
        </div>
    )
}

export default AddCategoryDropdown
