import React, {useState} from "react";
import Form from "react-bootstrap/Form";


const SendInput = (props) => {
    const [message,setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handler(message);
        setMessage("");
    };

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            handleSubmit(e)
        }
    };

    return (
        <div className={"p-4"}>
            <Form onSubmit={handleSubmit}>
                <Form.Control value={message} as="textarea" rows="5" placeholder="Enter Your Message" onChange={handleChange} onKeyDown={onEnterPress} />
            </Form>
        </div>
    )
};

export default SendInput;