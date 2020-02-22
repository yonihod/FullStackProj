import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default class EditPublisher extends Component {
    constructor(props){
        super(props);

        this.onChangePublisherName = this.onChangePublisherName.bind(this);
        this.onChangePublisherEmail = this.onChangePublisherEmail.bind(this);
        this.onChangePublisherRollno = this.onChangePublisherRollno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            name: '',
            email: '',
            rollNoi: ''
        }
    }
    componentDidMount() {
        axios.get('https://localhost:4000/publishers/edit-publisher/'+this.props.match.params.id)
            .then( (res)=> {
                console.log(res.data);
                console.log('Publisher Updated')
            }).catch( (error) => {
                console.log(error)
        });
        // Redirect to publisher list
        this.props.history.push('/list-publisher')
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangePublisherName} />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.onChangePublisherEmail} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="text" value={this.state.rollno} onChange={this.onChangePublisherRollno} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Publisher
                </Button>
            </Form>
        </div>);
    }
}