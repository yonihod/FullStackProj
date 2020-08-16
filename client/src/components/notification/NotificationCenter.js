import React, {useContext, useEffect, useState} from "react";
import Notification from "./Notification";
import  Style from "./notification.css"
import SocketService from "../../services/Socket";
import {useAuth0} from "../../reactAuth0";
import UserContext from "../../context/AppContext";


const NotificationCenter = (props) => {
    const [notificationArr, setNotificationArr] = useState([]);
    const {dbUser} = useContext(UserContext);
    useEffect(()=> {

        /**
         * we check if need to notify, means that user exists in room and is not the sender
         * @param users - participating users
         * @param newMessage - new received message
         */

        const shouldNotify = (users,newMessage) => {
            const filteredUsers = users.filter( (user) => {
                return (user.email === dbUser.email && dbUser._id !== newMessage.sender._id)
            });
            return filteredUsers.length;
        };

        SocketService.on('newRoomMessage', room => {
            // create new notification
            // show notification if i'm not the one who is sending
            const newMessage  = room.messages[room.messages.length -1];
            const newMessageText = newMessage.text;
            const notification = {
                img: "/notification/new-msg.jpg",
                text: `You received a new message ${newMessageText}`,
                link: "/rooms"
            };

            if(shouldNotify(room.users,newMessage)) {
                setNotificationArr([notification, ...notificationArr]);
                props.onNotify();
            }

        });

        SocketService.on('newRoom', room => {
            // if (room.users.map(x => x.email).includes(user.email))
            //     setRooms([...rooms, room]);
        });
    });

    return (
        <div id={"notification-center"}>
            {notificationArr.length ? notificationArr.map( (notification,index)=> {
                return <Notification key={index} data={notification}/>
            }): <Notification data={{img: "/notification/sad404.svg", text: "Nothing To See Here", link: "/home"}}/>}
        </div>
    )
};


export default NotificationCenter