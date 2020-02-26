import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import {useAuth0} from "../../react-auth0-spa";
import {Link} from "react-router-dom";

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
                    {isAuthenticated &&
                    <button onClick={() => logout({returnTo: 'http://localhost:3002'})}>Log out</button>}
                    {isAuthenticated && (
                        <span>
                            <Link to="/">Home</Link>&nbsp;
                            <Link to="/profile">Profile</Link>
                         </span>
                    )}
                </div>
                <Link to={"/register"} className="nav-link">Register</Link>
                <Link to={"/login"} className="nav-link">Login</Link>
            </Nav>
        </Navbar>
    );
};

export default NavBar;