import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import TwitterService from "../../services/Twitter"
import {Button, Spinner,Badge} from 'react-bootstrap';

export default class SinglePost extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            title: 'My Post Title',
            desc: 'My Post desc',
            owner: 'My Post owner',
            dueDate: 'My Post Date',
            tags: ['My Tags', 'Second Tag'],
            disableTwitterButton: false
        };

        PostsService.getPost(props.match.params.id).then(data => {
            console.log(data);
            this.setState(
                {
                    title: data.title,
                    desc: data.description,
                    owner: data.owner?.name,
                    dueDate: data.dueDate,
                    tags: data.tags
                })
        }).catch(err => {
            console.log(err);
        });
    }

    publish = () => {
        this.setState({disableTwitterButton: true});
        TwitterService.postTwit({title: this.state.title}).then((res) => {
            console.log(res);
            this.setState({disableTwitterButton: false});
        });
    };
    spinner = () => {
        if (this.state.disableTwitterButton) {
            return (
                <span>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={"mr-2"}
                    />
                    Posting...
                </span>
            );
        }
    };
    postToTwitter = () => {
        if(!this.state.disableTwitterButton) {
            return (
                <span>
                Post To Twitter
                <span className={'ml-2'}>
                    <i className={"fab fa-twitter"}/>
                </span>
            </span>
            );
        }
    };

    render() {
        return (
            <div>
                <div>
                    <Button className={'m-2'} onClick={this.publish} disabled={this.state.disableTwitterButton}>
                        {this.postToTwitter()}
                        {this.spinner()}
                    </Button>
                </div>
                <h1>{this.state.title}</h1>
                <div>
                    {this.state.tags.map(t => <Badge className="mr-1" variant={"primary"} key={t}>{t}</Badge>)}
                </div>
                <div>
                    <h4>{this.state.owner} / {this.state.dueDate}</h4>
                    {this.state.desc}
                </div>
            </div>
        );
    }
}