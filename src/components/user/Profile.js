import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";

export const Profile = () => {
    const { opuserId } = useParams()
    const { getProfileById, getMyProfile, profile } = useContext(ProfileContext)

    useEffect(() => {
        if (opuserId) {
            getProfileById(parseInt(opuserId))
        } else {
            getMyProfile()
        }
    }, [])

    return (
        <>

        <h2>{profile.user.username}</h2>
        <div>About me: {profile.bio}</div>

        </>
    )
}