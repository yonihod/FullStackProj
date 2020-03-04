import React, {Component} from "react";
import PostsService from "../../services/Posts";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        // assign owner dynamically when we finish with users
        this.state = {
            id: "",
            title: "",
            description: "",
            dueDate: "",
            tags: "",
            owner: "",
            createdAt: "",
            done: false
        };
    }

    componentDidMount() {
        PostsService.getPost(this.props.match.params.id).then(data => {
            console.log(data);
            let dueDate = (typeof  data.dueDate !=='undefined') ? new Date(data.dueDate).toISOString().slice(0,10) : "";
            this.setState(
                {
                    id: data._id,
                    title: data.title,
                    description: data.description,
                    owner: data.owner,
                    dueDate: dueDate,
                    createdAt: data.createdAt,
                    tags: data.tags,
                    done: false
                });
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        // need to inject owner here (current active user)
        this.state.updatedAt = Date.now();
        const post = {
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.dueDate,
            tags: this.state.tags,
            owner: this.state.owner._id,
            createdAt: this.state.createdAt
        };
        console.log(this.state);

        PostsService.EditPost(this.state.id,post).then( (res) => {
            this.props.history.push({
                pathname:'/posts',
                state:{done:true}
            });
        }).catch( (err) => {
            console.log(err)
        });
    };

    render() {
        return (
            <div className={"w-50 mt-4 ml-auto mr-auto"}>
                <h1>Edit Form</h1>
                <div className="form-wrapper">
                    {!this.state.done && (<Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value = {this.state.title} onChange= {e=>this.handleChange(e)} name="title" type="text"/>
                        </Form.Group>

                        <Form.Group controlId="dueDate">
                            <Form.Label>Due Date (Optional) </Form.Label>
                            <Form.Control data-date-format="DD MMMM YYYY" value = {this.state.dueDate} onChange= {e=>this.handleChange(e)} name="dueDate" type="date"/>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value = {this.state.description} onChange= {e=>this.handleChange(e)} name="description" as="textarea" rows={"4"}/>
                        </Form.Group>

                        <Button type="submit" variant="danger" size="lg" block="block">
                            Submit
                        </Button>

                    </Form>)}
                </div>
            </div>
        );
    }
}