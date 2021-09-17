import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ProfileContext } from "./ProfileProvider";

export const ProfileForm = () => {
    const { opuserId } = useParams()
    const { getProfileById, updateProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({})
    const [profileImage, setProfileImage] = useState(false)
    const history = useHistory()

    useEffect(() => {
        getProfileById(parseInt(opuserId))
            .then(setProfile)
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
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Edit your profile</h1>
                <fieldset>
                    <label htmlFor="bio"> Tell us about yourself(optional): </label>
                    <input
                        onChange={handleControlledInputChange}
                        type="text"
                        id="bio"
                        value={profile.bio}
                        className="form-control"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_pic"> Upload a profile pic(optional): </label>
                    <input type="file" id="profile_image" onChange={createProfileImageString} />
                </fieldset>
                <fieldset
                    style={{
                        textAlign: "center",
                    }}
                >
                    <button className="btn btn-1 btn-sep icon-send" onClick={e => {
                        e.preventDefault()
                        handleUpdate()
                        history.push("/profile")
                    }}>
                        Save Changes
                    </button>
                </fieldset>
            </form>
        </main>
    );
}