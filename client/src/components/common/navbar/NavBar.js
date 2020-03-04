import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useAuth0} from "../../../react-auth0-spa";
import {Link} from "react-router-dom";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <Link to={"/"}>
                    <img id="logo" src="/developi.png" alt="logo"/>
                </Link>
            </Navbar.Brand>
            <Nav><Link to={"/posts"} className="nav-link">Posts</Link></Nav>
            <Nav><Link to={"/create-post"} className="nav-link">Create a post</Link></Nav>
            <Nav><Link to={"/about-us"} className="nav-link">About</Link></Nav>
            <Nav className="ml-auto">
                {!isAuthenticated && <Link className="nav-link" to="/" onClick={() => loginWithRedirect({})}>Log in</Link>}
                {isAuthenticated && <Link title={user.name} className="nav-link" to="/profile"><img src={user.picture} alt="Logo" className="avatar"/></Link> }
                {isAuthenticated && <Link className="nav-link" to="/" onClick={() => logout({returnTo: ''})}>Log out</Link>}
            </Nav>
        </Navbar>
    );
};

export default NavBar;