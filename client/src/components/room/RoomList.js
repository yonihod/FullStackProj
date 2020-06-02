import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../context/AppContext";
import SocketService from "../../services/Socket";

const RoomItem = (props) => {
    const {dbUser} = useContext(UserContext);
    return (
        <li className={"room-item"} onClick={() => props.handler(props.room)}>
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

    SocketService.on('newRoom', data => {
        setRooms([...rooms, data]);
    });

    const [rooms,setRooms] = useState([]);

    useEffect( ()=> {
        setRooms(props.rooms);
    });

    const handleRoomSelection = (room) => {
        props.handler(room);

    };

    return (
        <div className={"room-list w-25"}>
            <ul>
                {rooms?.map( (room,index) => {
                    return (
                        <RoomItem room={room} key={index} handler={handleRoomSelection}/>
                    )
                })}
            </ul>
        </div>
    )

};

export default RoomList;