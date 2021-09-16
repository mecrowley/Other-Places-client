import React, { useState, createContext } from "react"

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState([])

    const getProfileById = id => {
        return fetch(`http://localhost:8000/userprofiles/${id}`,
        { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}}
        )
            .then(res => res.json())
            .then(setProfile)
    }

    const getMyProfile = () => {
        return fetch("http://localhost:8000/userprofiles/myprofile",
        { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}}
        )
            .then(res => res.json())
            .then(setProfile)
    }

    const updateProfile = profile => {
        return fetch(`http://localhost:8000/userprofiles/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(getMyProfile)
    }


    return (
        <ProfileContext.Provider value={{
            profile, getProfileById, getMyProfile, updateProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}