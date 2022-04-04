import React from 'react'

const LoadingPlaceholder = ({ className }) => {
    return (
        <div
            data-placeholder
            className={`mr-2 h-5 w-full overflow-hidden relative bg-slate-200 ${
                className ?? ''
            }`}
        ></div>
    )
}

export default LoadingPlaceholder
