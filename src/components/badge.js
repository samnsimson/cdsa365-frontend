import React from 'react'

const Badge = (props) => {
    const { color, size, message } = props
    const badgeColor = color ?? 'blue'
    const badgeSize = size ?? 'small'

    return (
        <span
            class={`bg-${badgeColor}-100 text-${badgeColor}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${badgeColor}-200 dark:text-${badgeColor}-800`}
        >
            {message ?? ''}
        </span>
    )
}

export default Badge
