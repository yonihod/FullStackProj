import React from "react";
import MessageList from "./MessageList";
import "./message.css";
import SendInput from "./SendInput";


const Room = (props) => {

    var currentId = 12345;
    var dummy_messages = [
        {id: 12345, name: "yoni", text: "Hello Ron, how are you doing today", time: 1589652174585},
        {id: 123456, name: "david", text: "Hi, i'm good! thank you for asking ", time: 1589652174540},
        {id: 12345, name: "yoni", text: "When is the estimated delivery on the project",time : 1589652174100},
        {id: 123456, name: "david", text: "It should be late noon 2044", time: 1589652174000}
    ];

    return (
          <div className={"mt-4 p-2"}>
              <div className={"message-header p-3"}>
                  <h6>Yoni</h6>
              </div>
              <div className={"message-list"}>
                  <MessageList currentUser= {currentId} messages={ dummy_messages }/>
                  <SendInput/>
              </div>
          </div>
    );



};

export default Room