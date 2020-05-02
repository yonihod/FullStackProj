import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useAuth0 } from "../../reactAuth0";

const PostBox = (props) => {
    const { user } = useAuth0();
    const classList = props?.classList ? props.classList : 'w-25 m-2';
    function isBelongToUser(userEmail) {
        return userEmail === (user?.email)
    }

    return (
        <Card className={classList}>
                {isBelongToUser(props.obj?.owner?.email) &&
                <div className={"manage-post"}>
                    <Link className={"edit"} to={`/edit-post/${props.obj._id}`}>
                        <i className={"fa fa-edit"}></i>
                    </Link>
                    <Link className={"delete"} to={`/edit-post/${props.obj._id}`}>
                        <i className={"fa fa-trash-alt"}></i>
                    </Link>
                </div>}
            <Link className={"card-link"} to={`/posts/${props.obj._id}`}>
                <Card.Body>
                    <Card.Title>
                        {props.obj.title}
                    </Card.Title>
                    <div>
                        {props.obj?.tags?.map(t => <Badge className="mr-1" variant={"primary"} key={t}>{t}</Badge>)}
                    </div>
                    <Card.Text>
                        {props.obj.description}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default PostBox;