import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import PostBox from "./PostBox";
import Success from "./Success";
import image from "../../images/posts_people.jpg"
import "../../App.css";
import Typist from 'react-typist';

export default class ListPost extends Component {

    constructor(props) {
        super(props);
        var done = false;
        if (typeof props.location !== 'undefined' && typeof props.location.state != 'undefined' && typeof props.location.state.done != "undefined") {
            done = props.location.state.done;
        }
        this.state = {
            posts: [],
            done: done
        }
    }

    componentDidMount() {

        PostsService.getPosts().then(res => {
            this.setState({
                posts: res
            });
        }).catch(err => {
            console.log(err)
        })
    }

    dataBox() {
        if (this.state.posts) {
            return this.state.posts.map((res, i) => {
                if (res !== undefined) {
                    return <PostBox obj={res} key={i}/>
                }
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.done ? <Success/> : null}
                <img src={image} className="posts_img"/>

                <div className="Writer"> <Typist>
                    <h1>Choose your task</h1> <br/>
                    <h4>A single place, millions of creative talents<br/>Improve your quality of life with style</h4>
                </Typist>
                </div>

                <div id={'cards-container'}>
                    {this.dataBox()}
                </div>
            </div>
        );
    }
}