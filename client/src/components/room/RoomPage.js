import React, {useContext, useEffect, useState} from "react";
import MessageList from "./MessageList";
import "./message.css";
import SendInput from "./SendInput";
import RoomsService from "../../services/Rooms";
import RoomList from "./RoomList";
import UserContext from "../../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import {useAuth0} from "../../reactAuth0";

const Room = (props) => {
    const {dbUser,setDbUser} = useContext(UserContext);
    const {isAuthenticated, user} = useAuth0();
    const [rooms, setRooms] = useState([]); // all rooms per user -> /room/:userId
    const [messages, setMessages] = useState([]);
    const [currentRoom, setRoom] = useState(0);
    const [behavior,setBehavior] = useState('smooth');

    const validityCheck = () => {
        if(dbUser == "" || dbUser.length == 0){
            if(user && isAuthenticated){
                //need to configure global dbUser state
                setDbUser(user);
            }else {
                return (
                    <div className={"spinner"}>
                        <Spinner animation="border" variant="primary"/>
                    </div>
                );
            }
        }
    };


    useEffect(() => {
        validityCheck();
        RoomsService.getCurrentUserRooms(dbUser.email).then(data => {
            setRooms(data)
        }).catch(err => {
            console.log(err)
        });
    }, [rooms,messages,dbUser]);

    if(typeof dbUser === 'undefined' || !dbUser){
        return (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    const handleNewMessage = (msg) => {
        RoomsService.addNewMessage(currentRoom._id,msg,dbUser._id).then( (res) => {
            if(typeof res !== 'undefined' && res.messages !== 'undefined') {
                const newMessageArray = [...res.messages];
                setBehavior('smooth');
                setMessages(newMessageArray);
            }
        })
    };
    const handleRoomSelection = (room) => {
        console.log("Room Selected");
        const newMessageArray = [...room.messages];
        setRoom(room);
        setBehavior('auto');
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
                    <MessageList currentUserEmail={dbUser.email} messages={messages} behavior={behavior}/>
                    <SendInput handler={handleNewMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Room