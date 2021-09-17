import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";
import './Profile.css'

export const Profile = () => {
    const { opuserId } = useParams()
    const { getProfileById, getMyProfile, updateProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({user: {}})
    const [profileImage, setProfileImage] = useState({})
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setProfileImage(base64ImageString)
            // Update a component state variable to the value of base64ImageString
        });
    }

    return (
        <>
            <div className="profile-container">
                <div className="profile">
                <img className="image" src={profile.profile_pic} />
                <div className="username"><h2>{profile.user.username}</h2></div>
                <button onClick={e => {
                    e.preventDefault()
                    history.push(`/profile/edit/${profile.id}`)
                }}>Edit my profile</button>
                {/* <div>Upload a new profile pic:
                <input type="file" id="profile_image" onChange={createProfileImageString} />
                <input type="hidden" name="profile_id" value={profile.id} />
                <button onClick={e => {
                    e.preventDefault()
                    // Upload the stringified image that is stored in state
                    const newprofile = profile
                    newprofile.profile_pic = profileImage
                    updateProfile(newprofile)
                }}>Upload</button>
            </div> */}
            <div className="date-joined">Joined: {parseInt(profile.user.date_joined)}</div>
                <div className="bio">About me: {profile.bio}</div>
                </div>
            </div>
        </>
    )
}