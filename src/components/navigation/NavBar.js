import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Other Places</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myplaces">My Places</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/place/addplace">Add a place</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link"
                onClick={
                    (event) => {
                        localStorage.clear()
                    }
                }
                to="/">Logout</Link>
            </li>
        </ul>
    )
}