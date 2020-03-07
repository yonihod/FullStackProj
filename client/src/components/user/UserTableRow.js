import React, {Component} from 'react';

export default class UserTableRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.skills.map(x => x.name)}</td>
                <td>{Math.floor(Math.random() * 10) + 1}</td>
            </tr>
        )
    }
}