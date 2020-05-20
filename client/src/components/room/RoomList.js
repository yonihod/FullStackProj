import React, {useEffect, useState} from "react";

const RoomItem = (props) => {
    return (
        <li className={"room-item"} onClick={() => props.handler(props.room)}>
            {props.room.users.map( (user,index) => {
                return (
                    <div className={"users"} key={index}>
                        {user.name}
                    </div>
                )
            })}
            <div className={"last-msg"}>
                {props.room.messages[props.room.messages.length-1].text}
            </div>
        </li>
    )
};

const RoomList = (props) => {

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
                {rooms.map( (room,index) => {
                    return (
                        <RoomItem room={room} key={index} handler={handleRoomSelection}/>
                    )
                })}
            </ul>
        </div>
    )

};

export default RoomList;