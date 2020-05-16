import React, {useEffect, useState} from "react";
import Message from "./message";


const MessageList = (props) => {
    const [messages,setMessages]  = useState([]);

    useEffect(() => {
        setMessages(props.messages);
    },[]);

  return (
    <div className={"p-2"}>
        {messages.map( (message,index) => {
            return (
                <Message key={index} type={props.currentUser == message.id ? "current" : "other" } message={message}/>
            )
        })}
    </div>
  );
};


export default MessageList;