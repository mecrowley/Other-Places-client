import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { PlaceContext } from "./PlaceProvider";
import "./Place.css"
import "../comment/Comment.css"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentContext } from "../comment/CommentProvider";

export const PlaceDetail = () => {
    const { getSinglePlace, visitPlace, unvisitPlace, savePlace, unsavePlace, deletePlace } = useContext(PlaceContext)
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

    const srcset = (image, size, rows = 1, cols = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const QuiltedImageList = () => {
        return (
            <ImageList
                sx={place?.photos.length > 1 ? {
                    width: 600, height: 750
                } : {
                    width: 600, height: 500
                }}
                variant="quilted"
                cols={2}
                rowHeight={250}
            >
                {
                    itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))
                }
            </ImageList >
        );
    }

    const theme = createTheme({
        palette: {
            delete: {
                main: '#cc0000',
                contrastText: '#fff'
            },
            neutral: {
                main: '#707070',
                contrastText: '#fff',
            },
        },
    });

    const IconLabelButtons = () => {
        return (
            <Stack direction="row" spacing={2}>
                <ThemeProvider theme={theme}>
                <Button variant="contained" size="small" color="delete" startIcon={<DeleteIcon />}
                onClick={e => {
                    e.preventDefault()
                    deletePlace(place.id)
                    .then(() => {
                        history.push("/")
                    })
                }}>
                    Delete
                </Button>
                <Button variant="contained" size="small" color="neutral" startIcon={<EditIcon />}
                onClick={e => {
                    e.preventDefault()
                    history.push(`/place/edit/${place.id}`)
                }}>
                    Edit
                </Button>
                </ThemeProvider>
            </Stack>
        );
    }

    let x = 0
    const itemData = place?.photos.map(p => {
        if (x === 0) {
            x = x + 1
            return ({
                img: p.photo,
                rows: 2,
                cols: 2
            })
        } else {
            return ({
                img: p.photo,
                rows: 1,
                cols: 1
            })
        }
    })

    comments.sort((a, b) => {
        return (b.id - a.id)
    })

    return (
        <div className="place__details flex column">
            <div className="place__header">
                <div className="place__header-left">
                    <h1 className="place__title">{place.title}</h1>
                    <h3 className="place__location">{place.city}, {place.state}</h3>
                </div>
                <div className="place__header-right">
                    <div className="flex">
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
                    <div className="flex">
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
                    {(place.isMine===true || localStorage.getItem("isAdmin")==="true") ?
                        <div className="icon__buttons">
                            {IconLabelButtons()}
                        </div> :
                        ""
                    }
                </div>
            </div>
            <div className="place__photos-list">
                {QuiltedImageList()}
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
                    <label htmlFor="comment">Add a comment:</label>
                    <input type="text" id="text" className="comment-text"
                        required value={newComment.text}
                        onChange={handleControlledInputChange} />
                    <button className="button" onClick={e => {
                        e.preventDefault()
                        createComment({
                            placeId: parseInt(placeId),
                            text: newComment.text
                        })
                            .then(() => {
                                setNewComment({text: ""})
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