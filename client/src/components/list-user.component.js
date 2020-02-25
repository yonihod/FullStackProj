import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow'
import UserService from "../services/users";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    // action when comp is loaded (inserted into the v-dom tree)
    componentDidMount() {
        // we get the data from server
        UserService.getUsers().then(res => {
            this.setState({
                users: res
            });
        }).catch(err => {
            console.log('There has been an error loading users in list-user-component: ' + err);
        });
    }

    // func to populate user row
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
                        <th>Roll No</th>
                        <th>Action</th>
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