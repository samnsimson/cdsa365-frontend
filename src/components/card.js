import React from 'react'

const Card = ({ title, children }) => {
    return (
        <div class="flex w-full">
            <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
                {title && (
                    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                        Card title
                    </h5>
                )}
                {children}
            </div>
        </div>
    )
}

export default Card
