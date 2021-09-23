import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { PlaceContext } from "./PlaceProvider";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const PlaceForm = () => {
    const { placeId } = useParams()
    const history = useHistory()
    const { getSinglePlace, createPlace, updatePlace } = useContext(PlaceContext)
    const [place, setPlace] = useState({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        postal_code: null,
        country: "",
        photos: []
    })
    const [placePhoto, setPlacePhoto] = useState(null)
    const [deletedPhotos, setDeletedPhotos] = useState([])
    const [placePhotos, setPlacePhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (placeId) {
            getSinglePlace(parseInt(placeId))
                .then(p => {
                    setPlacePhotos(p.photos)
                    setPlace(p)
                })
        }
    }, [])

    const handleInputChange = (event) => {
        const newPlace = { ...place }
        newPlace[event.target.id] = event.target.value
        setPlace(newPlace)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setPlacePhoto(base64ImageString)
        });
    }

    const uploadImageString = () => {
        const newPlacePhotos = [...placePhotos]
        newPlacePhotos.push(placePhoto)
        setPlacePhoto(null)
        setPlacePhotos(newPlacePhotos)
    }

    return (
        <div className="place__form">
            <h1 className="place-form__title">{placeId ? <>Edit {place.title}</> : <>Add a new place</>}</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>What is this place called?</div>
                <TextField id="title"
                    variant="outlined"
                    required
                    autoFocus
                    value={place.title}
                    onChange={handleInputChange} />
                <div>Give a description of the place:</div>
                <TextField id="description"
                    multiline
                    rows={4}
                    required
                    autoFocus
                    value={place.description}
                    onChange={handleInputChange}
                />
                <div>What is the address of the place? (optional)</div>
                <TextField id="address"
                    variant="outlined"
                    autoFocus
                    value={place.address}
                    onChange={handleInputChange}
                />
                <div>City, State, Zip Code, Country?</div>
                <div className="place-form__group">
                    <TextField id="city" label="City" variant="outlined" required
                        value={place.city} onChange={handleInputChange} />
                    <TextField id="state" label="State" variant="outlined" required
                        value={place.state} onChange={handleInputChange} />
                    <TextField id="postal_code" label="Zip Code (optional)" variant="outlined"
                        value={place.postal_code} onChange={handleInputChange} />
                    <TextField id="country" label="Country" variant="outlined" required
                        value={place.country} onChange={handleInputChange} />
                </div>
                <div className="flex">
                    {placeId ?
                        placePhotos.map(p => {
                            return (
                                <div className="flex column margin1">
                                    <img className="place__photo" src={p.photo ? p.photo : p} />
                                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                                        onClick={e => {
                                            e.preventDefault()
                                            if (p.photo) {
                                                const newDeletedPhotos = [...deletedPhotos]
                                                newDeletedPhotos.push(p)
                                                setDeletedPhotos(newDeletedPhotos)
                                                const newPlacePhotos = [...placePhotos]
                                                newPlacePhotos.splice(newPlacePhotos.indexOf(p), 1)
                                                setPlacePhotos(newPlacePhotos)
                                            } else {
                                                const newPlacePhotos = [...placePhotos]
                                                newPlacePhotos.splice(newPlacePhotos.indexOf(p), 1)
                                                setPlacePhotos(newPlacePhotos)
                                            }
                                        }}
                                    >Delete</Button>
                                </div>
                            )
                        }) :
                        placePhotos.map(p => {
                            return (
                                <div className="flex column margin1">
                                    <img className="place__photo" src={p} />
                                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                                        onClick={e => {
                                            e.preventDefault()
                                            const newPlacePhotos = [...placePhotos]
                                            newPlacePhotos.splice(newPlacePhotos.indexOf(p), 1)
                                            setPlacePhotos(newPlacePhotos)
                                        }}
                                    >Delete</Button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="place__photo-input">
                    <div>Upload photos?</div>
                    <input type="file" id="profile_image" onChange={createImageString} />
                    <button className="btn btn-primary"
                        onClick={event => {
                            event.preventDefault()
                            uploadImageString()
                        }}>Upload</button>
                </div>
            </Box>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    setIsLoading(true)
                    if (placeId) {
                        const imageStrings = placePhotos.filter(p => {
                            if (!p.id) {
                                return p
                            }
                        })
                        updatePlace({
                            id: place.id,
                            title: place.title,
                            description: place.description,
                            address: place.address,
                            city: place.city,
                            state: place.state,
                            postal_code: place.postal_code,
                            country: place.country,
                            deletedPhotos: deletedPhotos,
                            photos: imageStrings
                        })
                            .then(() => { setIsLoading(false) })
                            .then(() => {
                                history.push(`/place/detail/${place.id}`)
                            })
                    } else {
                        createPlace({
                            title: place.title,
                            description: place.description,
                            address: place.address,
                            city: place.city,
                            state: place.state,
                            postal_code: place.postal_code,
                            country: place.country,
                            photos: placePhotos
                        })
                            .then(() => { setIsLoading(false) })
                            .then(() => {
                                history.push("/myplaces")
                            })
                    }
                }}>
                {placeId ? <>Save Changes</> : <>Submit</>}
            </button>
        </div>
    )
}