import React, {useEffect, useState} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";
import {Badge} from "react-bootstrap";
import Skills from "../user/Skills";
import Spinner from "react-bootstrap/Spinner";


const Profile = () => {

    const [userFromDB, setUserFromDB] = useState([]);
    const {loading, user} = useAuth0();

    UserService.getUserByEmail(user.email).then(res => {
        setUserFromDB(res);
        return res;
    }).catch(err => {
        console.log(err);
        return [];
    });


    if (loading || userFromDB.length == 0) {
        return (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }


    const dataBox = () => {
        if (userFromDB.posts?.length) {
            return userFromDB.posts.map((post,index)=> {
                return <PostBox obj={post} key={index} classList={"w-50"} />;
            });
        }
    };

    return (
        <div className="profile">
            <header>
                <h1>{userFromDB.name}'s Profile</h1>
            </header>
            <div className="flex-container">
                <div className="profile-image">
                    <img src={user.picture} alt="Profile"/>
                </div>
                <div id="user-details">
                    <div>
                        <h2>{userFromDB.name}</h2>
                        <h4>{user.email}</h4>
                        {userFromDB.skills?.length > 0 &&
                        (
                            <div id="tags">
                                {userFromDB.skills.map(t => <Badge className="mr-1" variant={"primary"}
                                                                   key={t.name}>{t.name}</Badge>)}
                            </div>
                        )}
                        {userFromDB.skills?.length == 0 &&
                        (
                            <div>No skills added yet</div>
                        )}
                        <div id="add-skills">
                            Add Skills
                            <Skills/>
                        </div>
                    </div>
                </div>
                <div className="user-posts">
                    <h3>My Recent Posts</h3>
                    <div id="cards-container">
                        {dataBox()}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Profile;