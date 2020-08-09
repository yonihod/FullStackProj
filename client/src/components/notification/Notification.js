import React from "react";
import {Link} from "react-router-dom"

const Notification = (props) => {

    return (
        <Link to={props.data.link} className={"link"}>
            <div className={"notification pl-3 pr-3 pt-4 pb-4"}>
                <img className={"img"} src={props.data.img} />
                <span className={"txt ml-2"}>{props.data.text}</span>
            </div>
        </Link>
    )
};


export default Notification