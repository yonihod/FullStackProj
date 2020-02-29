import React, {Component} from 'react'
import PostsService from "../../services/Posts";
import PostBox from "./PostBox";
export default class ListPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts : []
        }
    }

    componentDidMount() {

        PostsService.getPosts().then(res => {
                this.setState({
                    posts : res
                });
            }).catch(err =>{
            console.log(err)
        })
    }

    dataBox(){
        if(this.state.posts){
            return this.state.posts.map((res,i)=>{
                if(res !== undefined) {
                    return <PostBox obj={res} key={i}/>
                }
            })
        }
    }

    render() {
        return(
                <div>
                    <h1>Posts</h1>
                    <div id={'cards-container'}>
                        {this.dataBox()}
                    </div>
                </div>
            );
    }
}