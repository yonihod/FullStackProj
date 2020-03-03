import React, { Component } from 'react'
import PostsService from "../../services/Posts";

export default class SinglePost extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            title: 'My Post Title',
            desc: 'My Post desc',
            owner: 'My Post owner',
            dueDate: 'My Post Date',
            tags: ['My Tags', 'Second Tag']
        };

        PostsService.getPost(props.match.params.id).then(data => {
            console.log(data);
            this.setState(
                {
                    title: data.title,
                    desc: data.description,
                    owner: data.owner?.name,
                    due_date: data.dueDate,
                    tags: data.tags
                })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div>
                    <h4>{this.state.owner} / {this.state.dueDate}</h4>
                    {this.state.desc}
                    <h3>Tags:</h3>
                    {this.state.tags.map(t => <li key={t}>{t}</li>)}
                </div>

            </div>


        );
    }
}