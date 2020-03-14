import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useAuth0 } from "../../reactAuth0";

const PostBox = (props) => {
    const { user } = useAuth0();
    
    function isBelongToUser(userEmail) {
        return userEmail === (user?.email)
    }

    return (
        <Card className={"w-25 m-2"}>
            {isBelongToUser(props.obj?.owner?.email) &&
            <div className={"manage-post"}>
                <Link to={`/edit-post/${props.obj._id}`}>
                    <i className={"fa fa-edit"}></i>
                </Link>
                <Link to={`/edit-post/${props.obj._id}`}>
                    <i className={"fa fa-trash-alt"}></i>
                </Link>
            </div>}
            <Card.Body>
                <Card.Title>
                    {props.obj.title}
                </Card.Title>
                <Card.Text>
                    {props.obj.description}
                </Card.Text>
                <Link to={`/posts/${props.obj._id}`}>
                    <Button className="explore" variant={"primary"}>Explore</Button>
                </Link>

            </Card.Body>
        </Card>
    );
};

export default PostBox;