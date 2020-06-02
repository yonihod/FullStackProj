import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth0} from "../../reactAuth0";
import PostsService from "../../services/Posts";
import UsersService from "../../services/Users";
import TwitterService from "../../services/Twitter"
import {Button, Spinner, Badge} from 'react-bootstrap';

const SinglePost = (props) => {
    const {user, isAuthenticated} = useAuth0();
    const [userId, setUserId] = useState();
    const [post, setPost] = useState({});
    const [disableTwitButton, setDisableTwitButton] = useState(false);

    useEffect(() => {
        PostsService.getPost(props.match.params.id).then(data => {
            setPost({
                title: data.title,
                desc: data.description,
                owner: data.owner,
                dueDate: data.dueDate,
                tags: data.tags,
                appliedUsers: data.appliedUsers,
                assignedUser: data.assignedUser,
                codeEditor: data.codeEditor
            })
        }).catch(err => {
            console.log(err)
        });

        if (user) {
            UsersService.getUserByEmail(user.email).then(u => {
                setUserId(u._id);
            }).catch(err => {
                console.log(err)
            });
        }

    }, [post.id]);


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

    function apply() {
        if (!isAuthenticated ||
            !userId ||
            userId === post.owner?._id ||
            !post ||
            post.assignedUser)
            return;

        if (post.appliedUsers.map(u => u._id).includes(userId)) {
            return <>
                <div>You have successfully applied for this task</div>
                <Button onClick={() => {
                    PostsService.CancelApplication(props.match.params.id, userId).then((updatedPost) => {
                        setPost(updatedPost);
                    });
                }}>
                    Cancel application</Button>
            </>
        }

        return <Button
            onClick={() => {
                PostsService.ApplyTask(props.match.params.id, userId).then((updatedPost) => {
                    setPost(updatedPost);
                });
            }}>
            Apply for this task!
        </Button>
    }

    function applicantsList() {
        if (!isAuthenticated ||
            !userId ||
            !post ||
            userId !== post.owner?._id ||
            post.assignedUser)
            return;

        return <div>
            <h3>Applicants</h3>
            <hr/>
            {post.appliedUsers.map(u => {
                return <div key={u._id} className="applicant">
                    {u.name}
                    <span className="applicant-actions"> 
                        <Link to={`/rooms`}>Contact</Link>
                        <Button onClick={() => assign(u._id)}>Assign!</Button>
                    </span>
                </div>
            })}
        </div>
    }

    function assign(applicantId) {
        PostsService.AssignApplicant(props.match.params.id, applicantId).then((updatedPost) => {
            setPost(updatedPost);
        });
    }

    function cancelProviderAssignment() {
        if (isAuthenticated &&
            userId &&
            post &&
            post.assignedUser &&
            userId === post.owner?._id)
            return <Button
                onClick={() => {
                    PostsService.cancelProviderAssignment(props.match.params.id, post.assignedUser)
                        .then((updatedPost) => {
                            setPost(updatedPost);
                        });
                }}>
                Cancel Assignment</Button>;
    }

    if (!post || Object.keys(post).length === 0)
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
                    <div>Code: {post.codeEditor} </div>
                    <div>Assigned Provider: {post.assignedUser?.name} {cancelProviderAssignment()}</div>
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
            {apply()}
            {applicantsList()}
        </div>
    );
};

export default SinglePost;