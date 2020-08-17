import React, {Component} from 'react';
import {Link} from "react-router-dom";
import User from "./User";

export default class UserTableRow extends Component {

    render() {
        return (
            <tr>
                <td>
                    <User user={this.props.obj} size={"xs"}></User>
                </td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.skills.map(x => x.name).join(', ')}</td>
                <td>{this.props.obj.rating ? this.props.obj.rating.toFixed(1) : 0}</td>
            </tr>
        )
    }
}