import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import SocketService from '../../services/Socket';
import PostBox from "../post/PostBox";
import Success from "../post/Success";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import Typist from 'react-typist';
import {InputGroup, FormControl, Dropdown, DropdownButton, Badge} from "react-bootstrap"

import Slider from 'react-slick';
import Card, {CardBody, CardTitle} from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import CardContext from "react-bootstrap/cjs/CardContext";
import {Link} from "react-router-dom";
import Background from '../../images/Home-Background.png';
import UserService from "../../services/Users";
import User from "../user/User";


export default class Home extends Component {

    constructor(props) {
        super(props);
        var done = false;
        var alertType = 'success';
        var msg = "";

        if (typeof props.location !== 'undefined' && typeof props.location.state != 'undefined' && typeof props.location.state.done != "undefined") {
            done = props.location.state.done;
        }
        if (typeof props.location !== 'undefined' && typeof props.location.state != 'undefined' && typeof props.location.state.alertType != "undefined") {
            alertType = props.location.state.alertType;
        }
        if (typeof props.location !== 'undefined' && typeof props.location.state != 'undefined' && typeof props.location.state.msg != "undefined") {
            msg = props.location.state.msg;
        }
        this.state = {
            posts: [],
            users :[],
            done: done,
            alertType: alertType,
            msg: msg,
            search: "",
            orderBy: undefined,
            toggleAdvancedSearch: false,
        }
    }

    componentDidMount() {

        SocketService.on('newPost', data => {
            this.setState({posts: [...this.state.posts, data]});
        });

        this.getPosts();

        this.getUsers();
    }

    getPosts = () => {
        PostsService.getPosts().then(res => {
            this.setState({posts: res});
        }).catch(err => {
            console.log(err)
        })
    };

    getUsers = () => {
        UserService.getUsers({}).then( (res) => {
            res.sort( (u1,u2) => {
                return u2.rating - u1.rating;
            });
            this.setState({users: res});
        })
    };

    onChange = e => {
        this.setState({search: e.target.value})
    };

    onKeyPress = e => {
        if (!this.state.toggleAdvancedSearch && e.target.value === "") {
            this.getPosts();
        }
    };

    renderPost = (post, index) => {
        if (this.state.posts.length) {
            return <PostBox obj={post} key={index}/>
        }
    };
    sortByDueDate = (date1, date2) => {
        if (this.state.posts.length) {
            let date1_ = new Date(date1.dueDate), date2_ = new Date(date2.dueDate);
            if (isNaN(date1_)) {
                date1_ = 0;
            }
            if (isNaN(date2_)) {
                date2_ = 0
            }
            return date2_ - date1_;
        }
    };

    sortByCreatedAt = (date1, date2) => {
        if (this.state.posts.length) {
            let date1_ = new Date(date1.createdAt).getTime(), date2_ = new Date(date2.createdAt).getTime();
            if (isNaN(date1_)) {
                date1_ = 0;
            }
            if (isNaN(date2_)) {
                date2_ = 0
            }
            return date1_ - date2_;
        }
    };
    sortByViews = (post) => {
        if (this.state.posts.length) {
            this.state.posts.filter((post => {
                return post.views > 10
            }));
        }
    };

    setOrderBy = ((order) => {
        this.setState({orderBy: order})
    });

    handleAdvancedSearch = (filter) => {
        this.setState({toggleAdvancedSearch: false});
        PostsService.getPosts(filter).then((res) => {
            this.setState({posts: res});
        }).catch((err) => {
            console.log(err)
        })
    };


    render() {
        const {orderBy} = this.state;
        const {search} = this.state;

        var filteredPosts = [];
        if (this.state?.posts && this.state.posts.length) {
            filteredPosts = this.state.posts.filter((post => {
                return post.views > 15
            })).sort(orderBy);
        }

        const settings = {

            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        return (
            <div className="home-page">
                {this.state.done ? <Success value={this.state}/> : null}
                <h1>
                    Welcome To Developi
                </h1>

                <div id="cards-container mt-5 mb-2"></div>

                <div id={"homepage-container"}>
                    <div id={"recommended-users"}>
                        <h4>
                            Meet Our Awesome Service Providers!
                        </h4>
                        <div className="users-container">
                            {this.state.users.map( (user,key) => {
                                return <User user={user} size={"md"} showRating={true}/>
                            } )}
                        </div>
                    </div>
                    <Container className={"slider-container"}>
                        <Link className="see-all" to="/posts">See All</Link>
                        <Slider {... settings}>
                            {filteredPosts.map(function (post) {
                                return (
                                    <React.Fragment key={post._id}>
                                        <Col>
                                            <Card className="slider-card">

                                                <Link className={"card-link"} to={`/posts/${post._id}`}>
                                                    <Card.Body>

                                                        <Card.Title>
                                                            <h5>{post.title}</h5>
                                                            <h6><i className='far fa-eye'></i>{post.views}</h6>
                                                        </Card.Title>
                                                        <Card.Text>
                                                            {post.description}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Link>
                                            </Card>
                                        </Col>
                                    </React.Fragment>
                                );
                            })}
                        </Slider>
                    </Container>
                    <div id={"get-work-done"}>
                        <div className={'txt'}>
                            <h4 className={"text-center"}>Get work done faster, with confidence</h4>
                            <br/>
                            Payment protection, guaranteed
                            Payment is released to the freelancer once you’re pleased and approve the work you get.
                        </div>
                        <div className={'txt'}>
                            <h4 className={"text-center"}>
                                Know the price up front
                            </h4>
                            <br/>
                            Find any service within minutes and know exactly what you’ll pay. No hourly rates, just a fixed price.
                        </div>
                        <div className={'txt'}>
                            <h4 className={"text-center"}>
                                We’re here for you 24/7
                            </h4>
                            <br/>
                            Reach out to us at any time! We have your back, from answering your questions to resolving issues.
                        </div>
                    </div>
                </div>
            </div> );
    }
}
