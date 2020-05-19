import React from "react";
import {Modal} from "react-bootstrap";
/**
 *
 * @param props:
 * type - current logged in User, or Other user
 * message - message obj
 * @returns {*}
 * @constructor
 */
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