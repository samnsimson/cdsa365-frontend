import React from 'react'

const Badge = (props) => {
    const { color, size, message, className } = props
    const badgeColor = color ?? 'blue'
    // const badgeSize = size ?? 'small'

    return (
        <div
            className={`bg-${badgeColor}-100 text-${badgeColor}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-${badgeColor}-200 dark:text-${badgeColor}-800 ${
                className ?? ''
            }`}
        >
            {message ?? ''}
        </div>
    )
}

export default Badge
