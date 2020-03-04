import React, {Component} from 'react'
import {Card,Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class PostBox extends Component {

    render() {
        return (
                <Card className={"w-25 m-2"}>
                    <div className={"manage-post"}>
                        <Link to={`/edit-post/${this.props.obj._id}`}>
                            <i className={"fa fa-edit"}></i>
                        </Link>
                        <Link data-value={this.props.obj._id} onClick={ () => this.toggleModal()}>
                            <i className={"fa fa-trash-alt"}></i>
                        </Link>
                    </div>
                    <Card.Img variant={"top"} src="https://via.placeholder.com/250"/>
                    <Card.Body>
                        <Card.Title>
                            {this.props.obj.title}
                        </Card.Title>
                        <Card.Text>
                            {this.props.obj.description}
                        </Card.Text>
                        <Link to={`/posts/${this.props.obj._id}`}>
                            <Button className="explore" variant={"primary"}>Explore</Button>
                        </Link>

                    </Card.Body>
                </Card>
            );
    }
}