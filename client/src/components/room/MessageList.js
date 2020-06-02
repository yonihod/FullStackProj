import React, {useEffect, useState, useRef} from "react";
import Message from "./Message";

const MessageList = (props) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = (behavior) => {
        if(messagesEndRef?.current?.scrollIntoView)
            messagesEndRef.current.scrollIntoView({behavior: behavior})
    };

    useEffect(() => {setMessages(props.messages);
        setTimeout(() => {
            scrollToBottom(props.behavior);
        },props.behavior == 'auto' ? 50 : 0);
    },[props.messages]);

    return (
        <div className={"p-2 message-list-items"}>
            {messages.map((message, index) => {
                return (
                    <Message key={index}
                             type={props.currentUserEmail === message.sender.email ? "current" : "other"}
                             message={message}
                    />
                )
            })}
            <div id={"messageEnd"} ref={messagesEndRef}/>
        </div>
    );
};

export default MessageList;