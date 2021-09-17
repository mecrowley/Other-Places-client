import React from "react"
import { Profile } from "./user/Profile"
import { ProfileProvider } from "./user/ProfileProvider"
import { Route } from "react-router-dom"
import { ProfileForm } from "./user/ProfileForm"

export const ApplicationViews = () => {
    return (
        <>
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}
            ></main>

            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/profile/:opuserId(\d+)">
                    <Profile />
                </Route>
                <Route exact path="/profile/edit/:opuserId(\d+)">
                    <ProfileForm />
                </Route>
            </ProfileProvider>
        </>
    )
}