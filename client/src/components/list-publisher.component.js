import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PublisherTableRow from './PublisherTableRow'
import PublishersService from "../services/publishers";

export default class PublisherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          publishers: []
        };
    }
    // action when comp is loaded (inserted into the v-dom tree)
    componentDidMount() {
        // we get the data from server
        PublishersService.getPublishers().then(res => {
            this.setState({
                publishers: res
            });
        }).catch(err => {
            console.log('There has ben an error loading publishers in list-publisher-componenet: ' + err);
        });
    }
    // func to populate publishers row
    DataTable() {
        if(this.state.publishers) {
            return this.state.publishers.map((res, i) => {
                return <PublisherTableRow obj={res} key={i}/>;
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