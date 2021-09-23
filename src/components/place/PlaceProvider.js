import React, { useState, createContext } from "react"

export const PlaceContext = createContext()

export const PlaceProvider = (props) => {
    const [places, setPlaces] = useState([])

    const getPlaces = () => {
        return fetch(`http://localhost:8000/places`,
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
            .then(setPlaces)
    }

    const getSinglePlace = id => {
        return fetch(`http://localhost:8000/places/${id}`,
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
    }

    const getPlacesByAuthor = authorId => {
        return fetch(`http://localhost:8000/places?userauthor=${authorId}`,
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
            .then(setPlaces)
    }

    const getPlacesByUsersFollows = () => {
        return fetch("http://localhost:8000/places/following",
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
            .then(setPlaces)
    }

    const createPlace = place => {
        return fetch("http://localhost:8000/places", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("opuser")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(place)
        })
            .then(res => res.json())
    }

    const updatePlace = place => {
        return fetch(`http://localhost:8000/places/${place.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("opuser")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(place)
        })
    }

    const deletePlace = placeId => {
        return fetch(`http://localhost:8000/places/${placeId}`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }

    const savePlace = placeId => {
        return fetch(`http://localhost:8000/places/${placeId}/saveplace`, {
            method: "POST",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }

    const unsavePlace = placeId => {
        return fetch(`http://localhost:8000/places/${placeId}/saveplace`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }

    const visitPlace = placeId => {
        return fetch(`http://localhost:8000/places/${placeId}/visitplace`, {
            method: "POST",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }

    const unvisitPlace = placeId => {
        return fetch(`http://localhost:8000/places/${placeId}/visitplace`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }

    return (
        <PlaceContext.Provider value={{
            places, getPlaces, getSinglePlace, getPlacesByAuthor, getPlacesByUsersFollows, createPlace, updatePlace, deletePlace, savePlace, unsavePlace, visitPlace, unvisitPlace
        }}>
            {props.children}
        </PlaceContext.Provider>
    )
}