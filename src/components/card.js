import React from 'react'

const Card = ({ title, children, className, bodyClass }) => {
    return (
        <div
            className={`flex flex-col shadow-lg rounded-lg overflow-hidden w-full ${
                className ?? ''
            }`}
        >
            {title && (
                <div className="block bg-slate-200 p-2 px-4 w-full">
                    <h5 className="leading-relaxed font-bold text-slate-600 text-sm uppercase">
                        {title}
                    </h5>
                </div>
            )}
            <div className={`p-6 bg-white ${bodyClass ?? ''}`}>{children}</div>
        </div>
    )
}

export default Card
