import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow'
import UserService from "../../services/Users";
import UserAdvancedSearch from "./UserAdvancedSearch";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import Typist from "react-typist";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: "",
            toggleAdvancedSearch: false
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = (filter) => {
        if (typeof filter === 'undefined') {
            filter = [];
        }
        UserService.getUsers(filter).then(res => {
            if (res) { // filter only users who has skills
                res = res.filter(user => {
                    return user?.skills && user.skills.length
                });
                this.setState({
                    users: res
                });
            }
        }).catch(err => {
            console.log('There has been an error loading users in list-user-component: ' + err);
        });
    };

    renderUser = (user, index) => {
        if (this.state.users.length) {
            return <UserTableRow obj={user} key={index}/>;
        }
    };

    onChange = e => {
        this.setState({search: e.target.value})
    };

    onKeyPress = e => {
        if (!this.state.toggleAdvancedSearch && e.target.value === "") {
            this.getUsers();
        }
    };

    handleAdvancedSearch = (filter) => {
        this.setState({toggleAdvancedSearch: false});
        this.getUsers(filter);
    };

    render() {

        const {search} = this.state;
        var filteredUsers = [];
        if (this.state?.users && this.state.users.length) {
            filteredUsers = this.state.users.filter((user => {
                if (user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    return true
                }
                if (user?.skills && user.skills.length) {
                    for (let i = 0; i < user.skills.length; i++) {
                        if (user.skills[i]['name'].toLowerCase().includes(search.toLowerCase())) {
                            return true;
                        }
                    }
                }
                return false;
            }));
        }
        return (
            <div className={"list-users table-wrapper"}>
                <div className={"writer-container"}>
                    <div className="writer">
                        <Typist>
                            <h1>Service Providers</h1><br/>
                            <h4>Meet our talented experts that will answer your needs</h4>
                        </Typist>
                    </div>
                </div>
                <div className="m-3">
                    <InputGroup size="lg" onChange={this.onChange}>
                        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" id="input-group-dropdown"
                                        title={<i className={"fa fa-search"}/>}>
                            <Dropdown.Item onClick={() => {
                                this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})
                            }} href="#">Advanced Search</Dropdown.Item>
                        </DropdownButton>
                        <FormControl onKeyPress={this.onKeyPress} aria-label="Large"
                                     aria-describedby="inputGroup-sizing-sm"/>
                    </InputGroup>
                </div>
                <UserAdvancedSearch
                    close={() => {
                        this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})
                    }}
                    show={this.state.toggleAdvancedSearch}
                    search={(filter) => this.handleAdvancedSearch(filter)}
                />
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
                    {filteredUsers.map((user, index) => {
                        return this.renderUser(user, index)
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}