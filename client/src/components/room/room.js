import React, {useEffect, useState} from "react";
import MessageList from "./MessageList";
import "./message.css";
import SendInput from "./SendInput";
import RoomService from "../../services/Room";
import {useAuth0} from "../../reactAuth0";
import RoomList from "./RoomList";


const Room = (props) => {

    let dummy_msgs1 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
        {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
        {id: 12345, name: "yoni", text: "When is the estimated delivery on the project",time : 1589652174100},
        {id: 123456, name: "david", text: "It should be late noon 1", time: 1589652174000}];
    let dummy_msgs2 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
        {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
        {id: 12345, name: "yoni", text: "When is the estimated delivery on the project",time : 1589652174100},
        {id: 123456, name: "david", text: "It should be late noon 2", time: 1589652174000}];
    let dummy_msgs3 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
        {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
        {id: 12345, name: "yoni", text: "When is the estimated delivery on the project",time : 1589652174100},
        {id: 123456, name: "david", text: "It should be late noon 3", time: 1589652174000}];
    let dummy_msgs4 = [{id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
        {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
        {id: 12345, name: "yoni", text: "When is the estimated delivery on the project",time : 1589652174100},
        {id: 123456, name: "david", text: "It should be late noon 4", time: 1589652174000}];

    let dummy_rooms = [
        {
            "users" : [{id:123456,name: "david"},{id:123456,name: "yoni"}],
            "messages" : dummy_msgs1,
        },
        {
            "users" : [{id:123456,name: "david"},{id:123456,name: "yoni"}],
            "messages" : dummy_msgs2,
        },
        {
            "users" : [{id:123456,name: "david"},{id:123456,name: "yoni"}],
            "messages" : dummy_msgs3,
        },
        {
            "users" : [{id:123456,name: "david"},{id:123456,name: "yoni"}],
            "messages" : dummy_msgs4,
        }
    ];

    const [messages,setMessages] = useState(dummy_msgs1);
    const [currentRoom, setRoom] = useState(0);
    const [rooms,setRooms] = useState(dummy_rooms);
    const {loading, user} = useAuth0();

    useEffect( () =>{
        //get room Id based on params and initiate message list

        // get rooms and initiate other room list

        // get current user ID \ Mail and compare it here

    },[]);


    var currentId = 12345;


    const handleNewMessage = (msg) => {
        // RoomService.EditRoom(roomId, msg ).then((result) => {
        //     if(result){
        //         setMessages(result);
        //     }
        // });
        // TODO delete this after route update
        const newMessageArray = [...messages,{id:12345, name:"yoni", text: msg, time: Date.now()}];
        setMessages(newMessageArray);
    };
    const handleRoomSelection = (room) => {
      console.log("Room Selected")
    };

    return (
          <div className={"mt-4 p-2 room"}>
              <div className={"message-header p-3"}>
                  <h6>Yoni</h6>
              </div>
              <div className={"d-flex"}>
                  <RoomList rooms={rooms} handler={handleRoomSelection} ></RoomList>
                  <div className={"message-list w-75"}>
                      <MessageList currentUser = {currentId} messages={ messages }/>
                      <SendInput handler = {handleNewMessage} />
                  </div>
              </div>
          </div>
    );



};

export default Room