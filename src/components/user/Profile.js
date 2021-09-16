import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";
import './Profile.css'

export const Profile = () => {
    const { opuserId } = useParams()
    const { getProfileById, getMyProfile, updateProfile, profile } = useContext(ProfileContext)
    const [profileImage, setProfileImage] = useState({})

    useEffect(() => {
        if (opuserId) {
            getProfileById(parseInt(opuserId))
        } else {
            getMyProfile()
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

            <img className="image" src={profile.profile_pic} />
            <h2>{profile.user.username}</h2>
            {/* <div>Upload a new profile pic:
                <input type="file" id="profile_image" onChange={createProfileImageString} />
                <input type="hidden" name="profile_id" value={profile.id} />
                <button onClick={e => {
                    e.preventDefault()
                    Upload the stringified image that is stored in state
                    const newprofile = profile
                    newprofile.profile_pic = profileImage
                    updateProfile(newprofile)
                }}>Upload</button>
            </div> */}
                <div>About me: {profile.bio}</div>

        </>
    )
}