import React, {Component} from 'react'
import {Card,Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class PostBox extends Component {

    render() {
        return (
                <Card className={"w-25 p-3"}>
                    <Card.Img variant={"top"} src="https://via.placeholder.com/250"/>
                    <Card.Body>
                        <Card.Title>
                            {this.props.obj.title}
                        </Card.Title>
                        <Card.Text>
                            {this.props.obj.description}
                        </Card.Text>
                        <Link to={`/posts/${this.props.obj._id}`}>
                            <Button variant={"primary"}>Explore</Button>
                        </Link>
                    </Card.Body>
                </Card>
            );
    }
}