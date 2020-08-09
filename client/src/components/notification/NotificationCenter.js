import React from "react";
import Notification from "./Notification";
import  Style from "./notification.css"


const NotificationCenter = (props) => {

    const arr = [];
    for(let i=1; i< 8 ; i++ ){
        var notification = {
            link: `/home`,
            img: `https://picsum.photos/id/${i}/200/300`,
            text: `notification Text ${i} notification Text ${i} notification Text ${i}`
        };
        arr.push(notification);
    }

    return (
        <div id={"notification-center"}>
            {arr.map( (notification,index)=> {
                return <Notification key={index} data={notification}/>
            })}
        </div>
    )
};


export default NotificationCenter