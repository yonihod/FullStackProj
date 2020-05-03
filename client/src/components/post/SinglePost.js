import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth0} from "../../reactAuth0";
import PostsService from "../../services/Posts";
import TwitterService from "../../services/Twitter"
import {Button, Spinner, Badge} from 'react-bootstrap';

const SinglePost = (props) => {
    const {user} = useAuth0();

    const [post, setPost] = useState(null);

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
        return userEmail && userEmail === user?.email
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

    if (!post)
        return null;

    return (
        <div className={"post-container"}>
            <div>
                <h1 className={"post-title"}>{post.title}</h1>
                <div>
                    {post.tags.map(t => <Badge className="mr-1 badge" key={t}>{t}</Badge>)}
                </div>
                <div className={"post-details"}>
                    <div>Owner: {post.owner?.name}</div>
                    <div>Due Date: {new Date(post.dueDate).toLocaleDateString()}</div>
                    <div>Description: {post.desc}</div>
                </div>
                <div className={"end-alignment"}>
                    <Button className={"m-2 twitter-btn"} onClick={publish} disabled={disableTwitButton}>
                        {postToTwitter()}
                        {spinner()}
                    </Button>
                </div>
            </div>
            {isBelongToUser(post.owner?.email) && <div className={"post-actions end-alignment"}>
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