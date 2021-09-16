import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("opuser", res.token)
                    return true
                } else {
                    return false
                }
            })
            .then((success) => {
                if (success) {
                    history.push("/")
                } else {
                    window.alert("Username or password was not valid.")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Other Places</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        {/* <label htmlFor="inputEmail"> Username </label> */}
                        <input
                            ref={username}
                            type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        {/* <label htmlFor="inputPassword"> Password </label> */}
                        <input
                            ref={password}
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                    </fieldset>
                    <fieldset
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <button className="btn btn-1 btn-sep icon-send" type="submit">
                            Sign In
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    );
};