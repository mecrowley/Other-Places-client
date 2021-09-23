import React, { useContext, useEffect } from "react";
import { PlaceContext } from "./PlaceProvider";
import "./Place.css";
import { useHistory } from "react-router";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

export const MyPlacesList = () => {
    const { places, getPlacesByUsersFollows, savePlace, unsavePlace, visitPlace, unvisitPlace } = useContext(PlaceContext)
    const history = useHistory()

    useEffect(() => {
        getPlacesByUsersFollows()
    }, [])

    places.sort((a,b) => {
        return b.id - a.id
    })

    return (
        <>
            <div className="places">
                {places.map(p => {
                    return (
                        <div className="place">
                            <img className="place-thumbnail" src={p?.photos[0]?.photo} />
                            <div className="icons">
                                {p.saved ? <div className="icon__wrap">
                                    <StarIcon fontSize="large"
                                        onClick={e => {
                                            e.preventDefault()
                                            unsavePlace(p.id)
                                                .then(() => {
                                                    getPlacesByUsersFollows()
                                                })
                                        }}
                                    />
                                    <p className="icon__description">Unsave place</p>
                                </div> : <div className="icon__wrap">
                                    <StarBorderIcon fontSize="large"
                                        onClick={e => {
                                            e.preventDefault()
                                            savePlace(p.id)
                                                .then(() => {
                                                    getPlacesByUsersFollows()
                                                })
                                        }} />
                                        <p className="icon__description">Save place</p>
                                </div>}
                                {p.visited ? <div className="icon__wrap">
                                <FlagIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        unvisitPlace(p.id)
                                            .then(() => {
                                                getPlacesByUsersFollows()
                                            })
                                    }}/> 
                                    <p className="icon__description">Unvisit place</p>
                                    </div>: <div className="icon__wrap">
                                    <FlagOutlinedIcon fontSize="large"
                                    onClick={e => {
                                        e.preventDefault()
                                        visitPlace(p.id)
                                            .then(() => {
                                                getPlacesByUsersFollows()
                                            })
                                    }}
                                />
                                <p className="icon__description">Visit place</p>
                                </div>}
                            </div>
                            <div className="text"
                                onClick={e => {
                                    e.preventDefault()
                                    history.push(`/place/detail/${p.id}`)
                                }}>
                                <h4 className="title">{p.title}</h4>
                                <div className="place-location_list">{p.city}, {p.state}</div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}