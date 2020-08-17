import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";

import React, {useContext, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useAuth0} from "../../../reactAuth0";
import {Link} from "react-router-dom";
import {MdMessage} from 'react-icons/md'
import { FaBell } from "react-icons/fa";
import UserContext from "../../../context/AppContext";
import NotificationCenter from "../../notification/NotificationCenter";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const {dbUser} = useContext(UserContext);
    const [showNotification,toggleNotification] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(0);

    const notificationButtonClick = () => {
        toggleNotification(!showNotification);
        setNotificationCounter("");
    };

    const onNotify = () => {
        const newCounter = parseInt( notificationCounter + 1 ) ;
        setNotificationCounter(newCounter);
    };
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className={"brand"}><Link to={"/"}><img id="logo" src="/logo.png" alt="logo"/></Link></Navbar.Brand>
            <Nav className={"hvr-float-shadow"}><Link to={"/posts"} className="nav-link">Posts</Link></Nav>
            <Nav className={"hvr-float-shadow"}><Link to={"/create-post"} className="nav-link">Create Post</Link></Nav>
            <Nav className={"hvr-float-shadow"}><Link to={"/service-providers"} className="nav-link">Service providers</Link></Nav>
            <Nav className={"hvr-float-shadow"}><Link to={"/about-us"} className="nav-link">About</Link></Nav>
            <Nav className="user-bar ml-auto">
                {isAuthenticated && dbUser && <Link to={"/rooms"} className={"nav-link"}><div className={"icon msg hvr-float-shadow"}><MdMessage/></div></Link>}
                {isAuthenticated && dbUser &&
                    <div id={"notification-container"}>
                        <div className={"icon notification-icon hvr-float-shadow"} onClick={notificationButtonClick}>
                            <FaBell/>
                            {notificationCounter && notificationCounter > 0 ? <span className={"notification-cnt"}>{notificationCounter}</span> : null}
                        </div>
                        <div className={showNotification ? "notification-center-wrapper open" : "notification-center-wrapper"}>
                            <div className={"beeper"}></div>
                            <NotificationCenter onNotify = {onNotify} />
                        </div>
                    </div>
                }
                {!isAuthenticated && <div className="nav-link hvr-float-shadow" onClick={() => loginWithRedirect({})}>Log in</div>}
                {isAuthenticated && dbUser && <Link title={user.name} className="nav-link hvr-float-shadow" to={`/profile/${dbUser._id}`}><img src={user.picture} alt="Logo" className="avatar"/></Link>}
                {isAuthenticated && <div className="nav-link hvr-float-shadow" onClick={() => logout({returnTo: window.location.origin})}>Log out</div>}
            </Nav>
        </Navbar>
    );
};

export default NavBar;