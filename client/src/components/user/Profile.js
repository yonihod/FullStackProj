import React, {useEffect, useState} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";
import {Badge} from "react-bootstrap";
import Skills from "../user/Skills";
import Spinner from "react-bootstrap/Spinner";

const Profile = () => {

    const [userFromDB, setUserFromDB] = useState({});
    const [skills, setSkills] = useState([]);
    const {loading, user} = useAuth0();

    useEffect(() => {
        UserService.getUserByEmail(user.email).then(res => {
            setUserFromDB(res);
            setSkills(res.skills);
            return res;
        }).catch(err => {
            console.log(err);
            return [];
        });
    }, [userFromDB.id]);

    if (loading || !userFromDB) {
        return (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    const dataBox = () => {
        if (userFromDB.posts?.length) {
            return userFromDB.posts.map((post, index) => {
                return <PostBox obj={post} key={index} classList={"w-30 m-2"}/>;
            });
        }
    };

    const updateSkills = (newSkill) => {
        let skill = {name: newSkill.name};
        let skillID = newSkill._id;
        let joined;

        if (skills) {
            joined = skills.concat(skill);
        } else {
            joined = [skill];
        }

        setSkills(joined);

        console.log(joined);
        UserService.EditUser(user.email, {skillID}).then((res) => {
            console.log("added");

        }).catch((err) => {
            console.log(err)
        });

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
                        {skills?.length > 0 &&
                        (<div id="tags">
                            {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}
                        </div>)}
                        {skills?.length === 0 &&
                        (<div>No skills added yet</div>)}
                    </div>
                    <div id="add-skills">
                        <h5>Add Skills</h5>
                        <Skills updateSkills={updateSkills}/>
                    </div>
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