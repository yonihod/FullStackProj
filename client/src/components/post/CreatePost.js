import React, {Component} from "react";
import PostsService from "../../services/Posts";
import Success from "./Success";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        // assign owner dynamically when we finish with users
        this.state = {
            title: "",
            description: "",
            dueDate: "",
            owner: "5e5a3bfdd9b5a3209db11284",
            createdAt: "",
            done: false
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        // need to inject owner here (current active user)
        this.state.createdAt = Date.now();
        const post = {
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.dueDate,
            owner: this.state.owner,
            createdAt: this.state.createdAt
        };
        console.log(this.state);

        PostsService.AddPost(post).then( (res) => {
            this.setState({title: '',createdAt: '', description: '', dueDate: '',owner: '', done: true, opened: false});
            // this.props.history.push('/posts');
        }).catch( (err) => {
            console.log(err)
        });
    };

    render() {
        return (
            <div className={"w-50 mt-4 ml-auto mr-auto"}>
                <h1>Submit Form</h1>
                <div className="form-wrapper">
                    <div>
                        {this.state.done ? (
                            <Success/>
                        ) : null}
                    </div>

                    {!this.state.done && (<Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value = {this.state.title} onChange= {e=>this.handleChange(e)} name="title" type="text"/>
                        </Form.Group>

                        <Form.Group controlId="dueDate">
                            <Form.Label>Due Date (Optional) </Form.Label>
                            <Form.Control value = {this.state.dueDate} onChange= {e=>this.handleChange(e)} name="dueDate" type="date"/>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value = {this.state.description} onChange= {e=>this.handleChange(e)} name="description" as="textarea" rows={"4"}/>
                        </Form.Group>

                        <Button type="submit" variant="danger" size="lg" block="block">
                            Create Post
                        </Button>

                    </Form>)}
                </div>
            </div>
        );
    }
}