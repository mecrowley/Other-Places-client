import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";
import './Profile.css'

export const Profile = () => {
    const { opuserId } = useParams()
    const { getProfileById, getMyProfile, followUser, unfollowUser } = useContext(ProfileContext)
    const [profile, setProfile] = useState({ user: {} })
    const history = useHistory()

    useEffect(() => {
        if (opuserId) {
            getProfileById(parseInt(opuserId))
                .then(setProfile)
        } else {
            getMyProfile()
                .then(setProfile)
        }
    }, [])

    return (
        <>
            <div className="profile-container">
                <div className="profile">
                    <img className="image" src={profile.profile_pic} />
                    <div className="username"><h2>{profile.user.username}</h2></div>
                    {profile.isMe ?
                        <button onClick={e => {
                            e.preventDefault()
                            history.push(`/profile/edit/${profile.id}`)
                        }}>Edit my profile</button> :
                        <button onClick={e => {
                            e.preventDefault()
                            if (profile?.following) {
                                unfollowUser(parseInt(opuserId))
                                    .then(() => {
                                        getProfileById(parseInt(opuserId))
                                            .then(setProfile)
                                    })
                            } else {
                                followUser(parseInt(opuserId))
                                    .then(() => {
                                        getProfileById(parseInt(opuserId))
                                            .then(setProfile)
                                    })
                            }
                        }}>{profile.following ? "Unfollow" : "Follow"}</button>
                    }
                    <div className="date-joined">Joined: {parseInt(profile.user.date_joined)}</div>
                    <div className="bio">About me: {profile.bio}</div>
                </div>
            </div>
        </>
    )
}