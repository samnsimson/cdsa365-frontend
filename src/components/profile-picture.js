import React, { useEffect, useState } from 'react'

const ProfilePicture = ({ name, url, className }) => {
    const [profileName, setProfileName] = useState('')
    const cssclass = className ?? ''

    const getInitials = (string) => {
        let names = string.split(' ')
        let initials = names[0].substring(0, 1).toUpperCase()
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase()
        }
        return initials
    }

    useEffect(() => {
        setProfileName(getInitials(name))
    }, [name])

    return url ? (
        <img
            src={url}
            className={`rounded-full w-10 h-10 ${cssclass}`}
            alt={name}
        />
    ) : (
        <div
            className={`rounded-full w-10 h-10 bg-red-100 font-semibold text-lg text-red-500 flex justify-center items-center ${cssclass}`}
        >
            {profileName}
        </div>
    )
}

export default ProfilePicture
