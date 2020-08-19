import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserService from "../../services/Users";

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = () => {
            console.log("onChangeUserName");
        };
        this.onChangeUserEmail = () => {
            console.log("onChangeUserEmail");
        };
        this.onChangeUserRollno = () => {
            console.log("onChangeUserRollno");
        };
        this.onSubmit = function (e) {
            e.prevantDefualt();
        };

        // State
        this.state = {
            name: '',
            email: '',
            rollNoi: ''
        }
    }

    componentDidMount() {
        UserService.getUser(this.props.computedMatch.params.id).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeUserName}/>
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.onChangeUserEmail}/>
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeUserRollno}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update User
                </Button>
            </Form>
        </div>);
    }
}