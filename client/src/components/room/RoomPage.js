import React, {useEffect, useState} from "react";
import MessageList from "./MessageList";
import "./message.css";
import SendInput from "./SendInput";
import RoomsService from "../../services/Rooms";
import {useAuth0} from "../../reactAuth0";
import RoomList from "./RoomList";

const Room = (props) => {

    // let dummy_msgs1 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
    //     {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
    //     {id: 12345, name: "yoni", text: "When is the estimated delivery on the project", time: 1589652174100},
    //     {id: 123456, name: "david", text: "It should be late noon 1", time: 1589652174000}];
    // let dummy_msgs2 = [{id: 12345, name: "yoni", text: "Alon how are you doing today", time: 1589652174585},
    //     {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
    //     {id: 12345, name: "yoni", text: "When is the estimated delivery on the project", time: 1589652174100},
    //     {id: 123456, name: "david", text: "It should be late noon 2", time: 1589652174000}];
    // let dummy_msgs3 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
    //     {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
    //     {id: 12345, name: "yoni", text: "When is the estimated delivery on the project", time: 1589652174100},
    //     {id: 123456, name: "david", text: "Alon Gever Gever It should be late noon 3", time: 1589652174000}];
    // let dummy_msgs4 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
    //     {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
    //     {id: 12345, name: "yoni", text: "Alon when is the estimated delivery on the project", time: 1589652174100},
    //     {id: 123456, name: "david", text: "It should be late noon 4", time: 1589652174000}];
    // let dummy_rooms = [
    //     {
    //         "users": [{id: 123456, name: "david"}, {id: 123456, name: "yoni"}],
    //         "messages": dummy_msgs1,
    //     },
    //     {
    //         "users": [{id: 123456, name: "david"}, {id: 123456, name: "yoni"}],
    //         "messages": dummy_msgs2,
    //     },
    //     {
    //         "users": [{id: 123456, name: "david"}, {id: 123456, name: "yoni"}],
    //         "messages": dummy_msgs3,
    //     },
    //     {
    //         "users": [{id: 123456, name: "david"}, {id: 123456, name: "yoni"}],
    //         "messages": dummy_msgs4,
    //     }
    // ];

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

        //get room Id based on params and initiate message list
        // RoomService.getRooms(props.match.params.id)
        // get rooms and initiate other room list

        // get current user ID \ Mail and compare it here

    }, []);

    const handleNewMessage = (msg) => {
        // RoomService.EditRoom(roomId, msg ).then((result) => {
        //     if(result){
        //         setMessages(result);
        //     }
        // });

        // TODO delete this after route update
        const newMessageArray = [...messages, {id: 12345, name: "yoni", text: msg, time: Date.now()}];
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