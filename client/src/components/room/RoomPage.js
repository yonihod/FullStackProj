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
    const [updated,setUpdated] = useState(false);
    const [otherUser,setOtherUser] = useState([]);

    const validityCheck = () => {
        if(typeof dbUser === 'undefined' || dbUser == "" || dbUser.length == 0){
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
        if(dbUser?.email) {
            RoomsService.getCurrentUserRooms(dbUser.email).then(data => {
                setRooms(data);
                setUpdated(true);
            }).catch(err => {
                console.log(err)
            });
        }
    }, [updated,messages,dbUser,otherUser]);

    if(typeof dbUser === 'undefined' || !dbUser){
        return (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    const compareAndGetOtherUser = (usersArray) => {
      return usersArray.filter( (user) => {
          return user._id != dbUser._id;
      })
    };

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
        const newUser = compareAndGetOtherUser(room.users);
        setOtherUser(newUser[0]);
        setBehavior('auto');
        setMessages(newMessageArray);
    };

    return (
        <div className={"mt-4 room"}>
            <div className={"message-header w-75 p-3 d-flex justify-content-start align-items-center"}>
                <h5 className={"title font-weight-bold m-0"}>{otherUser.name}</h5>
            </div>
            <div className={"d-flex"}>
                <RoomList rooms={rooms} currentRoom={currentRoom} handler={handleRoomSelection}/>
                <div className={"message-list w-75"}>
                    <MessageList currentUserEmail={dbUser.email} messages={messages} behavior={behavior}/>
                    <SendInput handler={handleNewMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Room