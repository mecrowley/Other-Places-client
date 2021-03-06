import React, { useState, createContext } from "react"

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({user:{}})

    const getProfileById = id => {
        return fetch(`http://localhost:8000/userprofiles/${id}`,
        { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}}
        )
            .then(res => res.json())
    }

    const getMyProfile = () => {
        return fetch("http://localhost:8000/userprofiles/myprofile",
        { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}}
        )
            .then(res => res.json())
    }

    const updateProfile = profile => {
        return fetch(`http://localhost:8000/userprofiles/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("opuser")}`
            },
            body: JSON.stringify(profile)
        })
    }

    const followUser = userId => {
        return fetch(`http://localhost:8000/userprofiles/${userId}/follow`, {
            method: "POST",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}
        })
    }

    const unfollowUser = userId=> {
        return fetch(`http://localhost:8000/userprofiles/${userId}/follow`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}`}
        })
    }


    return (
        <ProfileContext.Provider value={{
            profile, getProfileById, getMyProfile, updateProfile, followUser, unfollowUser
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}