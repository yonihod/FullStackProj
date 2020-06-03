import React, {Component, useState} from "react";
import PostsService from "../../services/Posts";
import Form from 'react-bootstrap/Form'
import {Button, Modal} from 'react-bootstrap';

function Delete(prop) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmDelete = () => {
        handleClose();
        prop.onChange();
    };

    return (
        <>
            <Button onClick={handleShow} className="delete" size={"lg"} variant={'danger'}>
                <i className={"fa fa-trash-alt"}/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={confirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

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
           done: false,
            canWrite: true
        };
    }

    componentDidMount() {
        PostsService.getPost(this.props.computedMatch.params.id).then(data => {
            console.log(data);
            let dueDate = (typeof data.dueDate !== 'undefined') ? new Date(data.dueDate).toISOString().slice(0, 10) : "";
            this.setState(
                {
                    id: data._id,
                    title: data.title,
                    description: data.description,
                    owner: data.owner,
                    dueDate: dueDate,
                    tags: data.tags,
                    done: false
                });
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        if (this.userHasWritePrivileges()) {
            e.preventDefault();
            // need to inject owner here (current active user)
            this.setState({updatedAt: Date.now()});

            if (this.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            const post = {
                title: this.state.title,
                description: this.state.description,
                dueDate: this.state.dueDate,
                tags: this.state.tags,
                owner: this.state.owner._id

            };

            PostsService.EditPost(this.state.id, post).then((res) => {
                this.props.history.push({
                    pathname: '/posts',
                    state: {done: true, alertType: "success", msg: "Post Edited Successfully"}
                });
            }).catch((err) => {
                console.log(err)
            });
        }
    };

    handleDelete = () => {
        if (this.userHasWritePrivileges()) {
            PostsService.DeletePost(this.state.id).then((res) => {
                console.log(res);
                this.setState({
                    id: "",
                    title: "",
                    description: "",
                    dueDate: "",
                    tags: "",
                    owner: "",
                   done: true
                });
                this.props.history.push({
                    pathname: '/posts',
                    state: {done: true, alertType: "danger", msg: "Post Deleted Successfully"}
                });
            }).catch((err) => {
                console.log(err)
            });
        }
    };

    checkValidity = () => {
        return this.state.dueDate && this.state.dueDate > new Date(Date.now()).toISOString().slice(0, 10) &&
            this.state.title.trim() !== "" && this.state.description.trim() !== "";
    };

    userHasWritePrivileges = () => {
        this.setState({canWrite: this.props?.currentUser?.email === this.state?.owner?.email});
        return this.state.canWrite;
    };

    render() {
        return (
            <div className={"w-50 mt-4 ml-auto mr-auto edit-post"}>
                <h1>Edit Post</h1>
                <Delete currentUser={this.props.currentUser} value={this.state.id} onChange={this.handleDelete}/>
                <div className="form-wrapper">
                    {!this.state.done && (<Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={this.state.title} onChange={e => this.handleChange(e)} name="title"
                                          isInvalid={this.state.title.trim() === ""}
                                          type="text"/>
                            <Form.Control.Feedback type="invalid">
                                Please fill title field.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="dueDate">
                            <Form.Label>Due Date (Optional) </Form.Label>
                            <Form.Control data-date-format="DD MMMM YYYY" value={this.state.dueDate}
                                          isInvalid={this.state.dueDate && this.state.dueDate < new Date(Date.now()).toISOString().slice(0, 10)}
                                          onChange={e => this.handleChange(e)} name="dueDate" type="date"/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid date, Due date must be older than today.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={this.state.description} onChange={e => this.handleChange(e)}
                                          name="description" as="textarea" rows={"4"}
                                          isInvalid={this.state.description.trim() === ""}/>
                            <Form.Control.Feedback type="invalid">
                                Please fill description field.
                            </Form.Control.Feedback>
                        </Form.Group>



                        <Button type="submit" variant="danger" size="lg" block="block">
                            Submit
                        </Button>

                    </Form>)}
                    {this.state.canWrite ? null : <div className={"danger"}>You do not have write privileges </div>}
                </div>
            </div>
        );
    }
}