import React from "react"
import { Profile } from "./user/Profile"
import { ProfileProvider } from "./user/ProfileProvider"
import { Route } from "react-router-dom"
import { ProfileForm } from "./user/ProfileForm"
import { PlaceProvider } from "./place/PlaceProvider"
import { PlaceList } from "./place/PlaceList"
import { MyPlacesList } from "./place/MyPlacesList"
import { PlaceDetail } from "./place/PlaceDetail"
import { CommentProvider } from "./comment/CommentProvider"

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
                <PlaceProvider>
                    <CommentProvider>
                        <Route exact path="/">
                            <PlaceList />
                        </Route>
                        <Route exact path="/myplaces">
                            <MyPlacesList />
                        </Route>
                        <Route exact path="/place/detail/:placeId(\d+)">
                            <PlaceDetail />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/profile/:opuserId(\d+)">
                            <Profile />
                        </Route>
                        <Route exact path="/profile/edit/:opuserId(\d+)">
                            <ProfileForm />
                        </Route>
                    </CommentProvider>
                </PlaceProvider>
            </ProfileProvider>
        </>
    )
}