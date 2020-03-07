import React, {Fragment, useState} from "react";
import {useAuth0} from "../../reactAuth0";
import { Link } from 'react-router-dom';
import Skills from "./Skills";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";

const Profile = () => {

    const [posts, setPosts] = useState(0);

    const {loading, user} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (<div>
            <div>User Not Found</div>
            <Link to="/">Go to Home Page</Link>
        </div>);
    }

    UserService.getUserByEmail(user.email).then(res =>{
       setPosts(res.posts);
    }).catch(err=> {
        console.log(err)
    });

    const dataBox = () => {
        if (posts) {
            return posts.map((res, i) => {
                if (res !== undefined) {
                    return <PostBox obj={res} key={i}/>
                }
            })
        }
    };

    // const filteredPosts = this.state.posts.filter( (post =>{
    //     return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
    //         post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
    // }));

    // const renderPost = (post,index) => {
    //     if (this.state.posts) {
    //         return <PostBox obj={post} key={index}/>
    //     }
    // };

    return (
        <div className="profile">
            <header>
                <img src={user.picture} alt="Profile"/>
                <p>
                    <h2>{user.name}</h2>
                    {user.email}
                </p>
            </header>
            <aside id="right">
                {/*<ListPost email={user.email}/>*/}
                <div id="cards-container">
                    {dataBox()}
                </div>
            </aside>
            <section>
                <Skills email={user.email}/>
            </section>
            {/*<p>*/}
            {/*    <code>{JSON.stringify(user, null, 2)}</code>*/}
            {/*</p>*/}
        </div>

    );
};

export default Profile;