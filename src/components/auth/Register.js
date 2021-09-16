import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const bio = useRef()
    const history = useHistory()
    const [profileImage, setProfileImage] = useState({})

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setProfileImage(base64ImageString)
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                bio: bio.current.value,
                profile_pic: profileImage
            }

            fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.token) {
                        localStorage.setItem("opuser", res.token)
                        history.push("/")
                    } else {
                        window.alert("User already exists or could not be created.")
                    }
                })
        } else {
            window.alert("Passwords do not match.")
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input
                        ref={firstName}
                        type="text"
                        name="firstName"
                        className="form-control"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input
                        ref={lastName}
                        type="text"
                        name="lastName"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input
                        ref={email}
                        type="email"
                        name="email"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input
                        ref={username}
                        type="text"
                        name="username"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input
                        ref={password}
                        type="password"
                        name="password"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input
                        ref={verifyPassword}
                        type="password"
                        name="verifyPassword"
                        className="form-control"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Tell us about yourself(optional): </label>
                    <input
                        ref={bio}
                        type="text"
                        name="bio"
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
                    <button className="btn btn-1 btn-sep icon-send" type="submit">
                        Register
                    </button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    );
};