import React, {useEffect, useState} from "react";
import Notification from "./Notification";
import  Style from "./notification.css"
import SocketService from "../../services/Socket";


const NotificationCenter = (props) => {
    const [notificationArr, setNotificationArr] = useState([]);
    /**
     * TODO: Create new notification model
     *      notification model will look like this
     *      {
     *          userId,notificationType,
     *          notificationText,notificationLink
     *      }
     *      on notification center mount,
     *      get the last 8 notifications and display them
     *      then we listen on upcoming notifications
     *      when new notification received we add it to the array
     *      update the view and update counter
     *      if the number of notifications exceed 8
     *      we delete the oldest one from the array
     *      we will support this notifications
     *      applyToTask- a user applied to a task i published
     *      assignedUser - i got the job
     *      cancel assigment
     *      pending finish request - owner get notified
     *      completed notification - SP notified
     *      new message notification
     */
    useEffect(()=> {

        SocketService.on('newRoomMessage', room => {
            // create new notification
            const newMessageText = room.messages[room.messages.length -1].text;
            const notification = {
                img: "/notification/new-msg.jpg",
                text: `You received a new message ${newMessageText}`,
                link: "/rooms"
            };
            setNotificationArr([...notificationArr, notification]);
        });

        SocketService.on('newRoom', room => {
            // if (room.users.map(x => x.email).includes(user.email))
            //     setRooms([...rooms, room]);
        });
    });

    return (
        <div id={"notification-center"}>
            {notificationArr.map( (notification,index)=> {
                return <Notification key={index} data={notification}/>
            })}
        </div>
    )
};


export default NotificationCenter