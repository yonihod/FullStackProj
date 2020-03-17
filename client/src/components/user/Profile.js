import React, {useState} from "react";
import {useAuth0} from "../../reactAuth0";
import Skills from "./Skills";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";

const Profile = () => {

    //const [posts, setPosts] = useState(0);
    const [userFromDB, setUserFromDB] = useState([]);
    const {loading, user} = useAuth0();

    if(userFromDB.length) {
        UserService.getUserByEmail(user.email).then(res =>{
            // setPosts(res.posts);
            setUserFromDB(res);
        }).catch(err=> {
            console.log(err)
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }



    const dataBox = () => {
        if (userFromDB.posts?.length) {
            return userFromDB.posts.filter((post)=>{ return (post !== undefined) }).map((res, i) => {
                return <PostBox obj={res} key={i}/>
            });
        }
    };

    return (
        <div className="profile">
            <header>
                <img src={user.picture} alt="Profile"/>
             <div>
                 <h2>{userFromDB.name}</h2>
                 <p>{userFromDB.email}</p>
             </div>
            </header>
            <div className="flex-container">
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