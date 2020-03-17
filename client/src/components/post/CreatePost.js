import React, {Component} from "react";
import PostsService from "../../services/Posts";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import UserService from "../../services/Users";

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            title: "",
            description: "",
            dueDate: "",
            tags: [],
            owner: "",
            createdAt: "",
            validated: false,
            done: false
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({createdAt: Date.now()});
        const post = {
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.dueDate,
            tags: this.state.tags,
            owner: this.state.owner,
            createdAt: this.state.createdAt
        };
        console.log(this.state);

        if (this.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        PostsService.AddPost(post).then((res) => {
            this.setState({title: '', createdAt: '', description: '', dueDate: '', owner: '', done: true});
            this.props.history.push({
                pathname: '/posts',
                state: {done: true, msg: "Post Created Successfully", alertType: "success"}
            });
        }).catch((err) => {
            console.log(err)
        });
    };

    checkValidity() {
        return this.state.dueDate && this.state.dueDate > new Date(Date.now()).toISOString().slice(0, 10);
    }

    componentDidMount() {
        UserService.getUserByEmail(this.user.email)
            .then(res => {
                if (!res) {
                    // for old users that are not in the DB
                    const user = {
                        name: this.user.name,
                        email: this.user.email,
                        password: 'required'
                    };

                    UserService.AddUser(user).then((u) => {
                        this.setState({owner: u._id})
                    })
                } else {
                    this.setState({owner: res._id})
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className={"w-50 mt-4 ml-auto mr-auto"}>
                <h1>Submit Form</h1>
                <div className="form-wrapper">
                    {!this.state.done && (
                        <Form validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={this.state.title} onChange={e => this.handleChange(e)} name="title"
                                              type="text"/>
                            </Form.Group>
                            <Form.Group controlId="dueDate">
                                <Form.Label>Due Date (Optional)</Form.Label>
                                <Form.Control value={this.state.dueDate}
                                              isInvalid={this.state.dueDate && this.state.dueDate < new Date(Date.now()).toISOString().slice(0, 10)}
                                              onChange={e => this.handleChange(e)} name="dueDate" type="date"/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid date, Due date must be older than today.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={this.state.description} onChange={e => this.handleChange(e)}
                                              name="description" as="textarea" rows={"4"}/>
                            </Form.Group>
                            <Button type="submit" variant="danger" size="lg" block="block">
                                Create Post
                            </Button>
                        </Form>)
                    }
                </div>
            </div>
        );
    }
}