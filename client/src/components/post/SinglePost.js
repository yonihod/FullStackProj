import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth0} from "../../reactAuth0";
import PostsService from "../../services/Posts";
import TwitterService from "../../services/Twitter"
import {Button, Spinner, Badge} from 'react-bootstrap';

const SinglePost = (props) => {
    const {user} = useAuth0();

    const [post, setPost] = useState({
        title: 'Post title',
        desc: 'Post desc',
        owner: 'Post owner',
        dueDate: 'Post date',
        tags: [],
    });

    const [disableTwitButton, setDisableTwitButton] = useState(false);

    useEffect(() => {
        PostsService.getPost(props.match.params.id).then(data => {
            setPost({
                title: data.title,
                desc: data.description,
                owner: data.owner,
                dueDate: data.dueDate,
                tags: data.tags
            })
        }).catch(err => {
            console.log(err)
        });
    });

    function isBelongToUser(userEmail) {
        return user?.email === userEmail
    }

    function postToTwitter() {
        if (!disableTwitButton) {
            return (
                <span> Post To Twitter
                    <span className={'ml-2'}><i className={"fab fa-twitter"}/></span>
                </span>
            );
        }
    }

    function spinner() {
        if (disableTwitButton) {
            return (
                <span>
                    <Spinner as="span" animation="border" size="sm" role="status"
                             aria-hidden="true" className={"mr-2"}/>
                    Posting...
                </span>
            );
        }
    }

    function publish() {
        setDisableTwitButton(true);
        TwitterService.postTwit({title: post.title}).then((res) => {
            setDisableTwitButton(false);
        });
    }

    return (
        <div className={"post-container"}>
            <div>
                <h1>{post.title}</h1>
                <div>
                    {post.tags.map(t => <Badge className="mr-1" variant={"primary"} key={t}>{t}</Badge>)}
                </div>
                <div className={"post-details"}>
                    <h4>Owner: {post.owner?.name}</h4>
                    <h4>Due Date: {new Date(post.dueDate).toLocaleDateString()}</h4>
                    <h4>Description: {post.desc}</h4>
                </div>
                <div>
                    <Button className={'m-2'} onClick={publish} disabled={disableTwitButton}>
                        {postToTwitter()}
                        {spinner()}
                    </Button>
                </div>
            </div>
            {isBelongToUser(post.owner?.email) && <div className={"post-actions"}>
                <Link className={"edit"} to={`/edit-post/${props.match.params.id}`}>
                    <i className={"fa fa-edit"}/>
                </Link>
                <Link className={"delete"} to={`/edit-post/${props.match.params.id}`}>
                    <i className={"fa fa-trash-alt"}/>
                </Link>
            </div>}
        </div>
    );
};

export default SinglePost;