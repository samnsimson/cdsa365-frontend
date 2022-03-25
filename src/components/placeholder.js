import React from 'react'

const Placeholder = ({ message }) => {
    return (
        <div className="p-4 w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-sm flex justify-center">
            <p className="font-semibold text-slate-400">{message ?? ''}</p>
        </div>
    )
}

export default Placeholder
