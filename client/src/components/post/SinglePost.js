import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth0} from "../../reactAuth0";
import PostsService from "../../services/Posts";
import UsersService from "../../services/Users";
import TwitterService from "../../services/Twitter"
import {Button, Spinner, Badge} from 'react-bootstrap';
import Rating from "../post/Rating";
import User from "../user/User";
import SocketService from "../../services/Socket";

const SinglePost = (props) => {
    const {user, isAuthenticated} = useAuth0();
    const [userId, setUserId] = useState();
    const [post, setPost] = useState({});
    const [disableTwitButton, setDisableTwitButton] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
    
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
                post_status: data.post_status,
                _id: data._id,
                views: data.views
            })
        }).catch(err => {
            console.log(err)
        });

        if (isAuthenticated) {
            UsersService.getUserByEmail(user.email).then(u => {
                setUserId(u._id);
            }).catch(err => {
                console.log(err)
            });
        }

    }, [post.id, showRating, showThanks]);


    function isBelongToUser(userEmail) {
        return userEmail && userEmail === user?.email
    }

    function isAssignedToUser() {
        return userId && userId === post?.assignedUser?._id;
    }

    function approveFinished() {
        if(post?.post_status === 'PENDING') {
            return (
                <Button
                    onClick={() => {
                        PostsService.approveFinished(post._id).then((res) => {
                            setPost(res);
                            setShowRating(true);
                        });
                    }}>
                    Approve Finished
                </Button>
            )
        }
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

        if (!isAuthenticated || userId === post.owner?._id || !post || post.assignedUser ||
            post?.post_status ==='PENDING' || post?.post_status ==='COMPLETED' ) return;

        if (post.owner?.name === "System") return;

        if (post.appliedUsers.map(u => u._id).includes(userId)) {
            return <>
                <div>You have successfully applied for this task</div>
                <Button onClick={() => {
                    PostsService.CancelApplication(props.match.params.id, userId).then((data) => {
                        setPost({
                            title: data.title,
                            desc: data.description,
                            owner: data.owner,
                            dueDate: data.dueDate,
                            tags: data.tags,
                            appliedUsers: data.appliedUsers,
                            assignedUser: data.assignedUser,
                            post_status: data.post_status,
                            views: data.views,
                    })
                    });
                }}>
                    Cancel application
                </Button>
            </>
        }


        return <Button
            onClick={() => {
                PostsService.ApplyTask(props.match.params.id, userId).then((data) => {
                    setPost({
                        title: data.title,
                        desc: data.description,
                        owner: data.owner,
                        dueDate: data.dueDate,
                        tags: data.tags,
                        appliedUsers: data.appliedUsers,
                        assignedUser: data.assignedUser,
                        post_status: data.post_status,
                        views : data.views

                    })
                });
            }}>
            Apply for this task!
        </Button>
    }

    function applicantsList() {
        if (userId !== post.owner?._id || post.assignedUser || post.appliedUsers.length === 0)
            return;

        return <div>
            <h3>Applicants</h3>
            <hr/>
            <div className={"applicants-container"}>
                {post.appliedUsers.map(u => {
                    return <div key={u._id} className="applicant">
                        <span className="applicant-actions">
                            <User user={u}></User>
                            <div className={"actions-container"}>
                                {/* <Link to={`/rooms`}>
                                <Button className={"contact"} variant={"primary"}>
                                    <i className="fas fa-phone"></i>
                                </Button>
                            </Link> */}
                            <Button className={"assign"} onClick={() => assign(u._id)}>
                                <i className="fas fa-check"></i>
                            </Button>
                            </div>
                        </span>
                    </div>
                })}
            </div>
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
            post.post_status !== "PENDING" &&
            post.post_status !== "COMPLETED" &&
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

    function finishTask(){
        if(post.post_status !== 'PENDING'){
            return <Button
                onClick={() => {
                    PostsService.finishTask(post._id).then((res) => {
                        setPost(res);
                    });
                }}>
                Finish Task
            </Button>
        }else {
            return <Button disabled>
                Pending Approval
            </Button>
        }
    }

    function rating(){
        if (showRating)
            return <div>
                <div>How do you like {post?.assignedUser?.name} service?</div>
                <Rating rateServiceProvider={rateServiceProvider}/>
            </div>
    }

    function rateServiceProvider(newRating){
        setShowRating(false);
        debugger;
        UsersService.rateUser(post.assignedUser.email, newRating).then((result) =>{
            debugger;
            setShowThanks(true);
        });
    }

    function thanks(){
        if (showThanks)
            return <div>
                Thank you for rating! ☺
            </div>
    }

    return (

        <div className={"post-container"}>
            <div id="background">
                <img src="https://media.istockphoto.com/vectors/white-grey-gradient-studio-room-background-vector-eps-10-vector-id1145390344?k=6&m=1145390344&s=170667a&w=0&h=Ww4KTAjK12ftThBgMaYUQamE3DPFkyD-uEfdFXll2iI=" className="stretch" alt=""/>
            </div>
            <div>
                <h1 className={"post-title"}>{post.title}</h1>
                
                <div className={"post-details"}>
                    <User user={post.owner} size={"md"}></User>
                    <div className={"small"}>
                        <div><small><strong>Due Date: {new Date(post.dueDate).toLocaleDateString()}</strong></small></div>
                        <div><small>Views: {post.views}</small></div>
                        <div className={post.post_status.toLowerCase() + " post-status"}><small><span className={"status"}>{post.post_status}</span></small></div>
                    </div>
                    <div className={"tags"}>
                        <small>
                            {post.tags.map(t => <Badge className="mr-1 badge" variant={"primary"} key={t}>{t}</Badge>)}
                        </small>
                    </div>
                </div>
                <div className={"post-body"}>
                    <div className={"desc"}>Description: {post.desc}</div>
                    {post.assignedUser &&
                    <div>Assigned Provider: <User user={post.assignedUser}></User> {cancelProviderAssignment()}</div>}
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
            {isAssignedToUser() && finishTask()}
            {isBelongToUser(post.owner?.email) && approveFinished()}
            {rating()}
            {thanks()}
        </div>
    );
};

export default SinglePost;