import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {

    return (
        <>
            {
                props.user &&
                <Link to={`/profile/${props.user._id}`}>
                    <div className="user">
                        <img src={props.user?.picture} />
                        <h5>{props.user.name}</h5>
                    </div>
                </Link>
            }
        </>
    )
}

export default User;