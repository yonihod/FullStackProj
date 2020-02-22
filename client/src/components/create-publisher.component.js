import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import PublisherService from '../services/publishers';

export default class CreatePublisher extends Component {

    constructor(props) {
        super(props);

        PublisherService.getPublishers();

        // Setting up functions
        this.onChangePublisherName = this.onChangePublisherName.bind(this);
        this.onChangePublisherEmail = this.onChangePublisherEmail.bind(this);
        this.onChangePublisherRollno = this.onChangePublisherRollno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            email: '',
            rollno: ''
        }
    }

    onChangePublisherName(e) {
        this.setState({name: e.target.value})
    }

    onChangePublisherEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangePublisherRollno(e) {
        this.setState({rollno: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Publisher successfully created!`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Roll no: ${this.state.rollno}`);

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
                    Create Publisher
                </Button>
            </Form>
        </div>);
    }
}