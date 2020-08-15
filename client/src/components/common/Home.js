import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import SocketService from '../../services/Socket';
import PostBox from "../post/PostBox";
import Success from "../post/Success";
// import "../../App.css";
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
                return post?.title?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    post?.description?.toLowerCase().indexOf(search.toLowerCase()) !== -1
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


                <div id="cards-container">
                    {filteredPosts.map ((post,index)=>{
                        return this.renderPost(post,index)
                    })}
                </div>
            </div>
        );
    }
}



