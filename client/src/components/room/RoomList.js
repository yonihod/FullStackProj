import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../context/AppContext";

const RoomItem = (props) => {
    const {dbUser} = useContext(UserContext);
    return (
        <li className={`room-item ${props.current}`} onClick={() => props.handler(props.room)}>
            {props.room.users?.map( (user,index) => {
                if(dbUser.name !== user.name)
                return (
                    <div className={"users"} key={index}>
                        {user.name}
                    </div>
                )
            })}
            <div className={"last-msg"}>
                {props.room.messages[props.room.messages.length-1]?.text}
            </div>
        </li>
    )
};

const RoomList = (props) => {

    const [rooms,setRooms] = useState([]);
    const [currentRoom,setRoom] = useState([]);

    useEffect( ()=> {
        setRooms(props.rooms);
        setRoom(props.currentRoom);
    });

    const handleRoomSelection = (room) => {
        props.handler(room);
    };

    const isCurrentRoom = (room) => {
        return room?._id === currentRoom?._id ? 'selected' : '';
    };

    return (
        <div className={"room-list w-25"}>
            <ul>
                {rooms?.map( (room,index) => {
                    return (
                        <RoomItem room={room} current={isCurrentRoom(room)} key={index} handler={handleRoomSelection}/>
                    )
                })}
            </ul>
        </div>
    )

};

export default RoomList;