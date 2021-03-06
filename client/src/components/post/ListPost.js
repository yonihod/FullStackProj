import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import SocketService from '../../services/Socket';
import PostBox from "./PostBox";
import Success from "./Success";
import "../../App.css";
import Typist from 'react-typist';
import {InputGroup,FormControl,Dropdown,DropdownButton} from "react-bootstrap"
import PostAdvancedSearch from "./PostAdvancedSearch"
import Banner from './Banner';

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
            res = res.reverse();
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
            <div className="post-page">
                <div id="background">
                    <img src="https://media.istockphoto.com/vectors/white-grey-gradient-studio-room-background-vector-eps-10-vector-id1145390344?k=6&m=1145390344&s=170667a&w=0&h=Ww4KTAjK12ftThBgMaYUQamE3DPFkyD-uEfdFXll2iI=" className="stretch" alt=""/>
                </div>
                {this.state.done ? <Success value={this.state}/> : null}
                <Banner/>
                <div className="writer-container">
                    <div className="writer">
                        <Typist>
                            <p className="list-title">Choose your next challenge</p> <br/>
                            <h4>A single place, millions of creative development tasks<br/>Improve your skills and help others
                            </h4>
                        </Typist>
                    </div>
                </div>
                <div className="m-3">
                    <InputGroup size="lg" onChange={this.onChange}>
                        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" id="input-group-dropdown" title={<i className={"fa fa-search"}/>}>
                            <Dropdown.Item onClick={() => this.setOrderBy(this.sortByDueDate)} href="#">Sort By Due Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setOrderBy(this.sortByCreatedAt)} href="#">Sort By Created At</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => {this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})}} href="#">Advanced Search</Dropdown.Item>
                        </DropdownButton>
                        <FormControl onKeyPress={this.onKeyPress} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </div>
                    <PostAdvancedSearch
                        close={ () => {this.setState({toggleAdvancedSearch: !this.state.toggleAdvancedSearch})}}
                        show={this.state.toggleAdvancedSearch}
                        search={ (filter) => this.handleAdvancedSearch(filter)}
                    />
                <div id="cards-container">
                    {filteredPosts.map ((post,index)=>{
                        return this.renderPost(post,index)
                    })}
                </div>
            </div>
        );
    }
}