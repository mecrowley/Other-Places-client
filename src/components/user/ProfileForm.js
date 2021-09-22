import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ProfileContext } from "./ProfileProvider";
import './Profile.css'

export const ProfileForm = () => {
    const { opuserId } = useParams()
    const { getProfileById, updateProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({})
    const [profileImage, setProfileImage] = useState(false)
    const history = useHistory()

    useEffect(() => {
        getProfileById(parseInt(opuserId))
            .then(profile => {
                if (profile.isMe) {
                    setProfile(profile)
                } else {
                    history.push("/profile")
                }
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const newProfile = { ...profile }
        newProfile[event.target.id] = event.target.value
        setProfile(newProfile)
    }

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

    const handleUpdate = () => {
        if (profileImage) {
            profile.profile_pic = profileImage
        }
        updateProfile(profile)
            .then(() => {
                history.push("/profile")
            })
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Edit your profile</h1>
                {profileImage ?
                <img className="image" src={profileImage} /> :
                <img className="image" src={profile?.profile_pic} />}
                <fieldset>
                    <label htmlFor="profile_pic"> Upload a new profile pic: </label>
                    <input type="file" id="profile_image" onChange={createProfileImageString} />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> About me: </label>
                    <input
                        onChange={handleControlledInputChange}
                        type="text"
                        id="bio"
                        value={profile.bio}
                        className="form-control"
                    />
                </fieldset>
                <button className="btn btn-1 btn-sep icon-send" onClick={e => {
                    e.preventDefault()
                    handleUpdate()
                }}>
                    Save Changes
                </button>
            </form>
        </main>
    );
}