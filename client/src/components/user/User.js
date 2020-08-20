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
    const renderRating = (rating) => {
        let floorRating = Math.floor(rating);
        var res = "";
        for(let i = 0 ; i < floorRating ; i++){
            res += "⭐";
        }
        return (
            <div>
                {props.user.rating.toFixed(1)}
                <br/>
                {res}
            </div>
        )
    };

    if(props?.user) {
        return (
            props.user &&
            <Link className={"user-link"} to={`/profile/${props.user._id}`}>
                <div className={`user ${size}`}>
                    <img src={img} referrerPolicy="no-referrer" onError={(e) => onError(e)} />
                    <div>
                        <h5>{props.user.name}</h5>
                        {props.showRating ? renderRating(props.user.rating) : null}
                    </div>

                </div>
            </Link>
        )
    }
};

export default User;