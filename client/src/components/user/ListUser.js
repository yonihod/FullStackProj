import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow'
import UserService from "../../services/Users";
import UserAdvancedSearch from "./UserAdvancedSearch";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import PostBox from "../post/PostBox";

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
        UserService.getUsers().then(res => {
            this.setState({
                users: res
            });
        }).catch(err => {
            console.log('There has been an error loading users in list-user-component: ' + err);
        });
    }

    renderUser = (user,index) => {
        if (this.state.users.length) {
            return <UserTableRow obj={user} key={index}/>;
        }
    };

    onChange = e => {
        this.setState({search: e.target.value })
    };

    handleAdvancedSearch = (filter) =>{
        UserService.getUsers(filter).then( (res) => {
            this.setState({users: res});
        }).catch( (err) => {
            console.log(err)
        })
    };

    render() {

        const {orderBy} = this.state;
        const {search} = this.state;
        var filteredUsers = [];
        if(this.state?.users && this.state.users.length) {
            filteredUsers = this.state.users.filter((user => {
                if(user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                    if( user.skills == null){
                        return true;
                    }
                }
                if(user?.skills && user.skills.length){
                    for(let i=0; i<user.skills.length;i++){
                        if(user.skills[i]['name'].toLowerCase().includes(search.toLowerCase())) {
                            return true;
                        }
                    }
                }
                return false;
            }));
        }
        return (
            <div className={"list-users table-wrapper"}>
                <div className="m-3">
                    <InputGroup size="lg" onChange={this.onChange}>
                        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" id="input-group-dropdown" title={<i className={"fa fa-search"}/>}>
                            <Dropdown.Item onClick={() => {this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})}} href="#">Advanced Search</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </div>
                <UserAdvancedSearch
                    close={ () => {this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})}}
                    show={this.state.toggleAdvancedSearch}
                    search={ (filter) => this.handleAdvancedSearch(filter)}
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
                    {filteredUsers.map ((user,index)=>{
                        return this.renderUser(user,index)
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}