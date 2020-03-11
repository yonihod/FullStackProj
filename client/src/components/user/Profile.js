import React, {Fragment, useState} from "react";
import {useAuth0} from "../../reactAuth0";
import { Link } from 'react-router-dom';
import Skills from "./Skills";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";

const Profile = () => {

    //const [posts, setPosts] = useState(0);
    const [userFromDB, setUserFromDB] = useState(0);
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
      // setPosts(res.posts);
       setUserFromDB(res);
    }).catch(err=> {
        console.log(err)
    });

    const dataBox = () => {
        if (userFromDB.posts) {
            return userFromDB.posts.map((res, i) => {
                if (res !== undefined) {
                    return <PostBox obj={res} key={i}/>
                }
            })
        }
    };

    return (
        <div className="profile">
            <header>
                <img src={user.picture} alt="Profile"/>
                <p>
                    <h2>{userFromDB.name}</h2>
                    {userFromDB.email}
                </p>
            </header>
            <div class="flex-container">
                <div id="cards-container">
                    {dataBox()}
                </div>
                <div>
                    <Skills email={user.email}/>
                </div>
            </div>
        </div>

    );
};

export default Profile;