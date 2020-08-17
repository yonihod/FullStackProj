import React from "react";
import { Link } from "react-router-dom";
import {Style} from "./user.css";

const User = (props) => {
    const size = props?.size ? props.size : 'sm';
    const defaultImgSrc = "/user.svg";
    const img = props?.user?.picture ? props.user.picture : defaultImgSrc;
    const onError = (e) => {
        e.target.src = defaultImgSrc;
    };

    if(props?.user) {
        return (
            props.user &&
            <Link className={"user-link"} to={`/profile/${props.user._id}`}>
                <div className={`user ${size}`}>
                    <img src={img} referrerpolicy="no-referrer" onError={(e) => onError(e)} />
                    <h5>{props.user.name}</h5>
                </div>
            </Link>
        )
    }
};

export default User;