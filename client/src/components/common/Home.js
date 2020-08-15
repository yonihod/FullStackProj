import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import SocketService from '../../services/Socket';
import PostBox from "../post/PostBox";
import Success from "../post/Success";
import "../../App.css";
import Typist from 'react-typist';
import {InputGroup,FormControl,Dropdown,DropdownButton} from "react-bootstrap"

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
        this.setState({search: e.target.value })
    };

    onKeyPress  = e => {
        if(!this.state.toggleAdvancedSearch && e.target.value === ""){
            this.getPosts();
        }
    };

    renderPost = (post,index) => {
        if (this.state.posts.length) {
            return <PostBox obj={post} key={index}/>
        }
    };
    sortByDueDate = (date1,date2) => {
        if(this.state.posts.length) {
            let date1_ = new Date(date1.dueDate) , date2_ = new Date(date2.dueDate);
            if(isNaN(date1_)){
                date1_ = 0;
            }
            if(isNaN(date2_)){
                date2_ = 0
            }
            return date2_-date1_;
        }
    };

    sortByCreatedAt = (date1,date2) => {
        if(this.state.posts.length) {
            let date1_ = new Date(date1.createdAt).getTime(), date2_ = new Date(date2.createdAt).getTime();
            if(isNaN(date1_)){
                date1_ = 0;
            }
            if(isNaN(date2_)){
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

    setOrderBy = ( (order) => {
        this.setState({orderBy:order})
    });

    handleAdvancedSearch = (filter) =>{
        this.setState({toggleAdvancedSearch:false});
        PostsService.getPosts(filter).then( (res) => {
            this.setState({posts: res});
        }).catch( (err) => {
            console.log(err)
        })
    };

    render() {
        const {orderBy} = this.state;
        const {search} = this.state;

        var filteredPosts = [];
        if(this.state?.posts && this.state.posts.length) {
            filteredPosts = this.state.posts.filter((post => {
                return post.views > 1
                // return post?.title?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                //     post?.description?.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })).sort(orderBy);
        }

        return (


            <div className={"post-page"}>
                {this.state.done ? <Success value={this.state}/> : null}
                <div className={"writer-container"}>
                    <h1>
                        Welcome To Developi
                        {/*{isAuthenticated ? user.given_name : "To Developi"}!*/}
                    </h1>
                    {/*<video autoPlay muted loop id="home-video">*/}
                    {/*    <source src="home-video.mp4" type="video/mp4"/>*/}
                    {/*</video>*/}
                </div>


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

                <div id="cards-container">
                    {filteredPosts.map ((post,index)=>{
                        return this.renderPost(post,index)
                    })}
                </div>
            </div>
        );
    }
}



