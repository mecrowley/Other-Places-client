import React, { useState, createContext } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getSingleComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`,
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
    }

    const getCommentsByPlace = placeId => {
        return fetch(`http://localhost:8000/comments?place=${placeId}`,
            { headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` } }
        )
            .then(res => res.json())
            .then(setComments)
    }

    const createComment = comment => {
        return fetch(`http://localhost:8000/comments`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("opuser")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("opuser")}`
            },
            body: JSON.stringify(comment)
        })
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${localStorage.getItem("opuser")}` }
        })
    }


    return (
        <CommentContext.Provider value={{
            comments, getSingleComment, getCommentsByPlace, createComment, updateComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}