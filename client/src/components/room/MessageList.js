import React, {useEffect, useState, useRef} from "react";
import Message from "./message";


const MessageList = (props) => {
    const [messages,setMessages]  = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        setMessages(props.messages);
        scrollToBottom()
    });


  return (
    <div className={"p-2 message-list-items"}>
        {messages.map( (message,index) => {
            return (
                <Message key={index} type={props.currentUser == message.id ? "current" : "other" } message={message}/>
            )
        })}
        <div ref={messagesEndRef} />
    </div>
  );
};


export default MessageList;