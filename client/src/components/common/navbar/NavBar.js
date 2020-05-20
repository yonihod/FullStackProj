import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useAuth0} from "../../../reactAuth0";
import {Link} from "react-router-dom";
import {MdMessage} from 'react-icons/md'

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className={"brand"}><Link to={"/"}><img id="logo" src="/logo.png" alt="logo"/></Link></Navbar.Brand>
            <Nav><Link to={"/posts"} className="nav-link">Posts</Link></Nav>
            <Nav><Link to={"/create-post"} className="nav-link">Create a post</Link></Nav>
            <Nav><Link to={"/service-providers"} className="nav-link">Service providers</Link></Nav>
            <Nav><Link to={"/about-us"} className="nav-link">About</Link></Nav>
            <Nav className="user-bar ml-auto">
                {isAuthenticated && <Link to={"/rooms"} className={"nav-link"}><div className={"msg"}><MdMessage/></div></Link>}
                {!isAuthenticated && <div className="nav-link" onClick={() => loginWithRedirect({})}>Log in</div>}
                {isAuthenticated && <Link title={user.name} className="nav-link" to="/profile"><img src={user.picture} alt="Logo" className="avatar"/></Link>}
                {isAuthenticated && <div className="nav-link" onClick={() => logout({returnTo: window.location.origin})}>Log out</div>}
            </Nav>
        </Navbar>
    );
};

export default NavBar;