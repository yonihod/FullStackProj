import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import SocketService from '../../services/Socket';
import PostBox from "./PostBox";
import Success from "./Success";
import "../../App.css";
import Typist from 'react-typist';
import {InputGroup,FormControl,Dropdown,DropdownButton} from "react-bootstrap"

export default class ListPost extends Component {

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
            orderBy: undefined
        }
    }

    componentDidMount() {

        SocketService.on('newPost', data => {
            this.setState({posts: [...this.state.posts, data]});
        });

        PostsService.getPosts().then(res => {
            this.setState({posts: res});
        }).catch(err => {
            console.log(err)
        })
    }

    onChange = e => {
        this.setState({search: e.target.value })
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

    seOrderBy = ( (order) => {
       this.setState({orderBy:order})
    });

    render() {
        const {orderBy} = this.state;
        const {search} = this.state;
        const filteredPosts = this.state.posts.filter( (post =>{
            return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                   post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })).sort(orderBy);
        
        return (
            <div className={"post-page"}>
                {this.state.done ? <Success value={this.state}/> : null}
                <div className="Writer mt-5">
                    <Typist>
                        <h1>Choose your task</h1> <br/>
                        <h4>A single place, millions of creative talents<br/>Improve your quality of life with style
                        </h4>
                    </Typist>
                </div>
                <div className="m-3">
                    <InputGroup size="lg" onChange={this.onChange}>
                        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" id="input-group-dropdown" title={<i className={"fa fa-search"}/>}>
                            <Dropdown.Item onClick={() => this.seOrderBy(this.sortByDueDate)} href="#">Sort By Due Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.seOrderBy(this.sortByCreatedAt)} href="#">Sort By Created At</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">Advanced Search</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
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