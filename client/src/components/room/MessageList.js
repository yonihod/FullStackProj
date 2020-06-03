import React, {useEffect, useState, useRef} from "react";
import Message from "./Message";
import SocketService from "../../services/Socket";

const MessageList = (props) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = (behavior) => {
        if(messagesEndRef?.current?.scrollIntoView)
            messagesEndRef.current.scrollIntoView({behavior: behavior})
    };

    SocketService.on('newMessage', data => {
        setMessages([...messages, data]);
    });

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