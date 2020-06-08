import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class UserTableRow extends Component {

    render() {
        return (
            <tr>
                <td><Link to={`/profile/${this.props.obj._id}`}>{this.props.obj.name}</Link></td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.skills.map(x => x.name).join(', ')}</td>
                <td>{Math.floor(Math.random() * 10) + 1}</td>
            </tr>
        )
    }
}