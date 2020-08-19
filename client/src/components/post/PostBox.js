import React from 'react'
import {Card, Button, Badge} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useAuth0} from "../../reactAuth0";

const PostBox = (props) => {
    const {user} = useAuth0();
    const classList = props?.classList ? props.classList : 'w-30 m-2';

    function isBelongToUser(userEmail) {
        return userEmail && userEmail === user?.email
    }

    return (
        <Link className={"card-link"} to={`/posts/${props.obj._id}`}>
            <Card className="classList">
                <Card.Body>
                    <Card.Title>
                        <h3>{props.obj.title}</h3>
                        <h6><i className='far fa-eye'></i> {props.obj.views} </h6>
                    </Card.Title>
                    <div>
                        {props.obj?.tags?.map(t => <Badge className="mr-1 badge" key={t}>{t}</Badge>)}
                    </div>
                    <Card.Text className="card-description">
                            {props.obj.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default PostBox;