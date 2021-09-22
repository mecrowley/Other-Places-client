import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { PlaceContext } from "./PlaceProvider";
import "./Place.css"
import "../comment/Comment.css"
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentContext } from "../comment/CommentProvider";

export const PlaceDetail = () => {
    const { getSinglePlace, visitPlace, unvisitPlace, savePlace, unsavePlace } = useContext(PlaceContext)
    const { comments, getCommentsByPlace, createComment, updateComment, deleteComment } = useContext(CommentContext)
    const [place, setPlace] = useState({ photos: [] })
    const [editComment, setEditComment] = useState({ id: null, edit: false })
    const [comment, setComment] = useState({})
    const [newComment, setNewComment] = useState({})
    const { placeId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getSinglePlace(parseInt(placeId))
            .then(setPlace)
        getCommentsByPlace(parseInt(placeId))
    }, [])

    const handleControlledInputChange = (event) => {
        const inputComment = { ...newComment }
        inputComment[event.target.id] = event.target.value
        setNewComment(inputComment)
    }

    const handleEditInputChange = (event) => {
        const inputComment = { ...comment }
        inputComment[event.target.id] = event.target.value
        setComment(inputComment)
    }

    comments.sort((a, b) => {
        return (b.id - a.id)
    })
    let x = 0

    return (
        <div className="place__details">
            <div className="place__header">
                <div className="place__header-left">
                    <h1 className="place__title">{place.title}</h1>
                    <h3 className="place__location">{place.city}, {place.state}</h3>
                </div>
                <div className="place__header-right">
                    <div className="place__visit">
                        <div className="visit-icon icons">
                            {place?.visited ? <div className="icon__wrap">
                                <FlagIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        unvisitPlace(place?.id)
                                            .then(() => {
                                                getSinglePlace(parseInt(placeId))
                                                    .then(setPlace)
                                            })
                                    }} />
                                <p className="icon__description">Unvisit place</p>
                            </div> : <div className="icon__wrap">
                                <FlagOutlinedIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        visitPlace(place?.id)
                                            .then(() => {
                                                getSinglePlace(parseInt(placeId))
                                                    .then(setPlace)
                                            })
                                    }}
                                />
                                <p className="icon__description">Visit place</p>
                            </div>}
                        </div>
                        <div className="visit-stats">
                            {place?.totalvisitors}
                            {place?.totalvisitors === 1 ? " Visitor" : " Visitors"}
                        </div>
                    </div>
                    <div className="place__save">
                        <div className="save-icon icons">
                            {place?.saved ? <div className="icon__wrap">
                                <StarIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        unsavePlace(place?.id)
                                            .then(() => {
                                                getSinglePlace(parseInt(placeId))
                                                    .then(setPlace)
                                            })
                                    }}
                                />
                                <p className="icon__description">Unsave place</p>
                            </div> : <div className="icon__wrap">
                                <StarBorderIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        savePlace(place?.id)
                                            .then(() => {
                                                getSinglePlace(parseInt(placeId))
                                                    .then(setPlace)
                                            })
                                    }} />
                                <p className="icon__description">Save place</p>
                            </div>}
                        </div>
                        <div className="save-stats">
                            {place?.totalsaved}
                            {place?.totalsaved === 1 ? " Save" : " Saves"}
                        </div>
                    </div>
                    {place.isMine === true || localStorage.getItem("isAdmin") === true ?
                        <button className="button">Edit this place</button> :
                        ""
                    }
                </div>
            </div>
            <div className="place__photos">
                <img className="photo1"
                    src={place?.photos[0]?.photo} />
                <div className="place__photos-small">
                    {place?.photos?.map(p => {
                        if (x === 0) {
                            x++
                            return null
                        } else {
                            console.log(p.photo)
                            return (
                                <img className="place__img"
                                    src={p.photo}
                                />
                            )
                        }
                    })}
                </div>
            </div>
            <div className="place__text">
                <div className="place__description">{place?.description}</div>
                <div className="place__author">
                    --<Link to={`/profile/${place?.opuser?.id}`}>{place?.opuser?.user?.username}</Link>
                </div>
            </div>
            <div className="comments">
                <h2 className="comments__header">Comments</h2>
                <div className="add-comment">
                    <label htmlFor="url">Add a comment:</label>
                    <input type="textarea" id="text" className="input-field"
                        required autoFocus value={newComment.text}
                        autoSize={true} onChange={handleControlledInputChange} />
                    <button className="button" onClick={e => {
                        e.preventDefault()
                        createComment({
                            placeId: parseInt(placeId),
                            text: newComment.text
                        })
                            .then(() => {
                                getCommentsByPlace(parseInt(placeId))
                            })
                    }}>Submit</button>
                </div>
                {comments?.map(c => {
                    return (
                        <div className="comment">
                            <div className="comment__opuser">
                                <img className="profile__pic" src={c.opuser.profile_pic} />
                                <Link to={`/profile/${c.opuser.id}`}>{c.opuser.user.username}</Link>
                            </div>
                            <div className="comment__body">
                                <div className="comment__text">
                                    {editComment.edit && editComment.id === c.id ?
                                        <input type="text" id="text" key={c.id} className="edit-field"
                                            required autoFocus value={comment.text}
                                            onChange={handleEditInputChange} /> :
                                        <div>{c.text}</div>
                                    }</div>
                                <div className="comment__options">
                                    <div className="comment__date">{new Date(c.created).toLocaleDateString('en-US')}</div>
                                    {c.isMine ? <div className="comment__icons">
                                        <div className="edit-icon">
                                            <EditIcon onClick={e => {
                                                e.preventDefault()
                                                if (editComment.edit === false) {
                                                    setComment(c)
                                                    setEditComment({ id: c.id, edit: true })
                                                } else {
                                                    updateComment(comment)
                                                        .then(() => {
                                                            setEditComment({ id: null, edit: false })
                                                            setComment({})
                                                        })
                                                        .then(() => {
                                                            getCommentsByPlace(parseInt(placeId))
                                                        })
                                                }
                                            }}
                                            />
                                        </div>
                                        <div className="delete-icon"><DeleteIcon onClick={e => {
                                            e.preventDefault()
                                            deleteComment(c.id)
                                                .then(() => {
                                                    getCommentsByPlace(parseInt(placeId))
                                                })
                                        }} /></div>
                                    </div>
                                        : ""}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}