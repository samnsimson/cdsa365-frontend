import React from 'react'

const Rupee = ({ symbol }) => {
    return (
        <span
            dangerouslySetInnerHTML={{
                __html: symbol ? symbol : '&#8377;',
            }}
        ></span>
    )
}

export default Rupee
