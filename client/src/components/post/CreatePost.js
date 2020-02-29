import React, {Component} from "react";
import PostsService from "../../services/Posts";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        // assign owner dynamically when we finish with users
        this.state = {
            title: "",
            description: "",
            duoDate: "",
            owner: "5e5a3bfdd9b5a3209db11284",
            createdAt: ""
        }
    }
    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        // need to inject owner here (current active user)
        this.state.createdAt = Date.now();
        const post = {
            title: this.state.title,
            description: this.state.description,
            duoDate: this.state.duoDate,
            owner: this.state.owner,
            createdAt: this.state.createdAt
        };
        console.log(this.state);

        PostsService.AddPost(post).then( (res) => {
            this.setState({title: '',createdAt: '', description: '', duoDate: '',owner: ''});
        }).catch( (err) => {
            console.log(err)
        });
    };


    render() {
        return (
            <div className={"w-50 mt-4 ml-auto mr-auto"}>
                <h1>Submit Form</h1>
                <div className="form-wrapper">
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value = {this.state.title} onChange= {e=>this.change(e)} name="title" type="text"/>
                        </Form.Group>

                        <Form.Group controlId="duoDate">
                            <Form.Label>Duo Date (Optional) </Form.Label>
                            <Form.Control value = {this.state.duoDate} onChange= {e=>this.change(e)} name="duoDate" type="date"/>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value = {this.state.description} onChange= {e=>this.change(e)} name="description" as="textarea" rows={"4"}/>
                        </Form.Group>


                        <Button onClick={(e)=>this.onSubmit(e)} variant="danger" size="lg" block="block" type="submit">
                            Create Post
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}