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


export default class Home extends Component {
    // const {isAuthenticated, user} = useAuth0();

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
            done: done,
            alertType: alertType,
            msg: msg,
            search: "",
            orderBy: undefined,
            toggleAdvancedSearch: false
        }
    }

    componentDidMount() {

        SocketService.on('newPost', data => {
            this.setState({posts: [...this.state.posts, data]});
        });

        this.getPosts();
    }

    getPosts = () => {
        PostsService.getPosts().then(res => {
            this.setState({posts: res});
        }).catch(err => {
            console.log(err)
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
            var topPosts: [];
            this.state.posts.filter((post => {
                return post.views > 10
            }));

        }
    }

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
                return post.views > 1
                // return post?.title?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                //     post?.description?.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })).sort(orderBy);


            console.clear();
        }

        const settings = {

            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <div className="home-page">
                <div id="background">
                    <img src="https://freedesignfile.com/upload/2016/11/Light-blue-wavy-abstract-background-vector-04.jpg" className="stretch" alt=""/>
                </div>
                {this.state.done ? <Success value={this.state}/> : null}
                <div className={"writer-container"}>
                    <h1 class="home-title">
                        Welcome To Developi
                        {/*{isAuthenticated ? user.given_name : "To Developi"}!*/}
                    </h1>
                    {/*<video autoPlay muted loop id="home-video">*/}
                    {/*    <source src="home-video.mp4" type="video/mp4"/>*/}
                    {/*</video>*/}
                </div>

                <div id="cards-container mt-5 mb-2">
                    <h4 className="float-left">Most Popular</h4>
                    <Link className="float-right text-uppercase" to="/">see all</Link>
                </div>
                <br/>
                <Container className="slider-show ml-5 float-left" >
                    <Slider {... settings} class="float-left">
                        {filteredPosts.map(function (post) {
                            console.log(post);
                            return (
                                <React.Fragment>
                                    <Col>
                                        <Card className="slider-card">

                                            <Link className={"card-link"} to={`/posts/${post._id}`}>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <h5>{post.title}</h5>
                                                        <h6><i className='far fa-eye'></i>{post.views}</h6>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="card-description">
                                                            {post.description}
                                                        </div>
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

            </div> );
    }

}

{/*<div id="posts-container">*/}
{/*    <div className="profile-img"></div>*/}
{/*    <h1>*/}
{/*        Maddie*/}
{/*    </h1>*/}
{/*    <div className="description">*/}
{/*        Maddie is a front end web developer in New York. She has worked in the field for 10 years now.*/}
{/*        Check out her projects in the links below. She is available for hire as well.*/}
{/*    </div>*/}
{/*    <div className="social">*/}
{/*        <a>GitHub</a>*/}
{/*        <a>Twitter</a>*/}
{/*        <a>LinkedIn</a>*/}
{/*    </div>*/}
{/*    <button>Hire Me</button>*/}
{/*    <footer>*/}
{/*        <div className="likes">*/}
{/*            <p><i className='fa fa-heart'></i></p>*/}
{/*            <p>1.5K</p>*/}
{/*        </div>*/}
{/*        <div className="projects">*/}
{/*            <p>Projects</p>*/}
{/*            <p>154</p>*/}
{/*        </div>*/}
{/*    </footer>*/}
{/*</div>*/}

{/*<Carousel*/}
{/*    swipeable={false}*/}
{/*    draggable={false}*/}
{/*    showDots={true}*/}
{/*    responsive={this.responsive}*/}
{/*    ssr={true} // means to render carousel on server-side.*/}
{/*    infinite={true}*/}
{/*    autoPlay={this.props.deviceType !== "mobile" ? true : false}*/}
{/*    autoPlaySpeed={1000}*/}
{/*    keyBoardControl={true}*/}
{/*    customTransition="all .5"*/}
{/*    transitionDuration={500}*/}
{/*    containerClass="carousel-container"*/}
{/*    removeArrowOnDeviceType={["tablet", "mobile"]}*/}
{/*    deviceType={this.props.deviceType}*/}
{/*    dotListClass="custom-dot-list-style"*/}
{/*    itemClass="carousel-item-padding-40-px"*/}


{/*>*/}
{/*    <div>item 1</div>*/}
{/*    <div>item 1</div>*/}
{/*    <div>item 1</div>*/}
{/*    <div>item 1</div>*/}
{/*</Carousel>;*/}

// <div id="cards-container">
//     {filteredPosts.map((post, index) => {
//         return this.renderPost(post, index)
//     })}
// </div>





