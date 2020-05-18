import React, {useEffect, useState} from "react";

const RoomItem = (props) => {
    return (
        <li className={"room-item"}>
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

    const handleRoomSelection = () => {
        console.log("Room Selection");
    };

    return (
        <div className={"room-list w-25"}>
            <ul>
                {rooms.map( (room,index) => {
                    return (
                        <RoomItem room={room} key={index}/>
                    )
                })}
            </ul>
        </div>
    )

};

export default RoomList;