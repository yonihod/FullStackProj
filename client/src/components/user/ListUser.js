import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow'
import UserService from "../../services/Users";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserService.getUsers().then(res => {
            this.setState({
                users: res
            });
        }).catch(err => {
            console.log('There has been an error loading users in list-user-component: ' + err);
        });
    }

    DataTable() {
        if (this.state.users) {
            return this.state.users.map((res, i) => {
                return <UserTableRow obj={res} key={i}/>;
            });
        }
    }

    render() {
        return (
            <div className={"table-wrapper"}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}