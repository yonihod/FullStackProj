import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import UserService from "../../services/Users";

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        UserService.getUsers().then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

        // Setting up functions
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserRollno = this.onChangeUserRollno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            email: '',
            rollno: ''
        }
    }

    onChangeUserName(e) {
        this.setState({name: e.target.value})
    }

    onChangeUserEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangeUserRollno(e) {
        this.setState({rollno: e.target.value})
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`User successfully created!`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Roll no: ${this.state.rollno}`);

        const user = {
            name: this.state.name,
            email: this.state.email,
            rollno: this.state.rollno
        };

        UserService.AddUser(user);

        this.setState({name: '', email: '', rollno: ''})
    }

    render() {
        return (<div className="form-wrapper">
            <Form>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Create User
                </Button>

            </Form>
        </div>);
    }
}