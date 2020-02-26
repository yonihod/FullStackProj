import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import {useAuth0} from "../../react-auth0-spa";
import {Switch, Route, Link} from "react-router-dom";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <Link to={"/"} className="nav-link">Developi</Link>
            </Navbar.Brand>
            <Nav><Link to={"/posts"} className="nav-link">Posts</Link></Nav>
            <Nav><Link to={"/create-post"} className="nav-link">Create a post</Link></Nav>
            <Nav><Link to={"/about-us"} className="nav-link">About</Link></Nav>
            <Nav className="ml-auto">
                <div>
                    {!isAuthenticated && (<button onClick={() => loginWithRedirect({})}>Log in</button>)}
                    {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                </div>
                <Link to={"/register"} className="nav-link">Register</Link>
                <Link to={"/login"} className="nav-link">Login</Link>
            </Nav>
        </Navbar>
    );
};

export default NavBar;