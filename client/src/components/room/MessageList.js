import React, {useEffect, useState, useRef} from "react";
import Message from "./Message";

const MessageList = (props) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    };

    useEffect(() => {
        setMessages(props.messages);
        scrollToBottom()
    });

    return (
        <div className={"p-2 message-list-items"}>
            {messages.map((message, index) => {
                return (
                    <Message key={index} type={props.currentUserEmail === message.sender.email ? "current" : "other"}
                             message={message}/>
                )
            })}
            <div ref={messagesEndRef}/>
        </div>
    );
};

export default MessageList;