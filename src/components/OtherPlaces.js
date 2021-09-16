import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const OtherPlaces = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("opuser")) {
                return <>
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("opuser")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("opuser")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)