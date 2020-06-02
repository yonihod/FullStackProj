import React, {useEffect, useState, useContext} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";
import {Badge} from "react-bootstrap";
import Skills from "../user/Skills";
import Spinner from "react-bootstrap/Spinner";
import UserContext from "../../context/AppContext";
import {Link} from "react-router-dom";

const Profile = () => {

    const {dbUser, setDbUser} = useContext(UserContext);
    const [skills, setSkills] = useState([]);
    const {loading, user, isAuthenticated} = useAuth0();

    const validityCheck = () => {
        if(user && isAuthenticated && !dbUser ) {
            // set dbuser
            setDbUser(user);
        }
        if(loading || !dbUser){
            return (
                <div className={"spinner"}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            );
        }
    };

    useEffect(() => {
        validityCheck();
        if(dbUser?.skills) {
            setSkills(dbUser.skills);
        }
    }, [dbUser]);

    const dataBox = () => {
        if (dbUser?.posts?.length) {
            return dbUser.posts.map((post, index) => {
                return <PostBox obj={post} key={index} classList={"w-30 m-2"}/>;
            });
        }
    };

    const updateSkills = (newSkill) => {
        let user = dbUser;
        user.skills.push(newSkill);

        UserService.EditUser(user.email, user).then(res => {
            setDbUser(res);
            setSkills(res.skills);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="profile">
            <header>
                <h1>{dbUser?.name}'s Profile</h1>
            </header>
            <div className="flex-container">
                <div className="profile-image">
                    <img src={user.picture} alt="Profile"/>
                </div>
                <div id="user-details">
                    <div>
                        <h2>{dbUser?.name}</h2>
                        <h4>{dbUser?.email}</h4>
                        {skills?.length > 0 &&
                        (<div id="tags">
                            {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}
                        </div>)}
                        {skills?.length === 0 &&
                        (<div>No skills added yet</div>)}
                    </div>
                    <Link className={"edit"} to={`/edit-user/${dbUser._id}`}>
                        Edit Profile
                    </Link>
                </div>
                <div className="user-posts">
                    <h3>My Recent Posts</h3>
                    <div id="cards-container">
                        {dataBox()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;