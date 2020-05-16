import React from "react";
import Form from "react-bootstrap/Form";


const SendInput = () => {

    const handleSubmit = (e) => {
        // fire submit event here
        e.preventDefault();
        console.log("text message was sent")
    };

    return (
        <div className={"p-4"}>
            <Form onSubmit={handleSubmit.bind(this)}>
                <Form.Control type="text" placeholder="Enter Your Message" />
            </Form>
        </div>
    )
};

export default SendInput;