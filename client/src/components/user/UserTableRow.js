import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class UserTableRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollno}</td>
                <td>
                    <Link className="edit-link" to={"/edit-user/" + this.props.obj._id}>
                        <Button size={"sm"} variant={"link"}>
                            Edit
                        </Button>
                    </Link>
                    <Button size={"sm"} variant={"danger"}> Delete </Button>
                </td>
            </tr>
        )
    }
}