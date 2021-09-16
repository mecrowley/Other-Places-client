import React from "react"
import { Profile } from "./user/Profile"
import { ProfileProvider } from "./user/ProfileProvider"
import { Route } from "react-router-dom"

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
            </ProfileProvider>
        </>
    )
}