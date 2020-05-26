import React, {useEffect, useState} from "react";
import MessageList from "./MessageList";
import "./message.css";
import SendInput from "./SendInput";
import RoomsService from "../../services/Rooms";
import {useAuth0} from "../../reactAuth0";
import RoomList from "./RoomList";
import MessagesService from "../../services/Messages";

const Room = (props) => {
    const {user} = useAuth0();
    const [rooms, setRooms] = useState([]); // all rooms per user -> /room/:userId
    const [messages, setMessages] = useState([]);
    const [currentRoom, setRoom] = useState(0);

    useEffect(() => {
        RoomsService.getCurrentUserRooms(user.email).then(data => {
            setRooms(data)
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const handleNewMessage = (msg) => {
        // MessagesService.addMessage(msg,user.email).then((result) => {
        //     if(result){
        //         setMessages([...messages,result]);
        //     }
        // });

        const newMessageArray = [...messages, {id: 1, sender: {email: user.email}, text: msg}];
        setMessages(newMessageArray);
    };
    const handleRoomSelection = (room) => {
        console.log("Room Selected");
        const newMessageArray = [...room.messages];
        setMessages(newMessageArray);
    };

    return (
        <div className={"mt-4 p-2 room"}>
            <div className={"message-header p-3 d-flex justify-content-left align-items-center"}>
                <h5 className={"font-weight-bold m-0"} style={{color: "#3fb3a0"}}>Chat</h5>
            </div>
            <div className={"d-flex"}>
                <RoomList rooms={rooms} handler={handleRoomSelection}/>
                <div className={"message-list w-75"}>
                    <MessageList currentUserEmail={user.email} messages={messages}/>
                    <SendInput handler={handleNewMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Room