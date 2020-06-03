import React from "react";

const Message = (props) => {
    const time = new Date(props.message.createdAt);
    return (
        <div className={props.type + ' message'}>
            <div>
                <p className={"message-content"}>{props.message.text}</p>
                <div className={"date text-right"}>
                    <small>{time.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</small>
                </div>
            </div>
        </div>
    );
};

export default Message