import React from "react";

const Message = (props) => {
    return (
        <div className={props.type}>
            <div>
                <p className={"message-content"}>{props.message.text}</p>
            </div>
        </div>
    );
};

export default Message