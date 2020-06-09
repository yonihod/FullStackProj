import React, {useEffect, useState,useContext} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";
import {Badge} from "react-bootstrap";
import Skills from "../user/Skills";
import Spinner from "react-bootstrap/Spinner";
//import UserContext from "../../context/AppContext";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const myEventsList = [
    {
        start: '2020-05-20',
        end: '2020-06-02',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
     //   data: 'you can add what ever random data you may want to use later',
    }
];
const MyCalendar = props => (
    <div>
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    </div>
);

const Profile = (props) => {

    const [profile, setProfile] = useState();
    const [skills, setSkills] = useState([]);
    const {loading, user, isAuthenticated} = useAuth0();

    const validityCheck = () => {
        if(user && isAuthenticated && !profile ) {
            setProfile(user);
        }
        if(loading || !profile){
            return (
                <div className={"spinner"}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            );
        }
    };

    const getUser = (id) => {
        UserService.getUser(id).then(u => {
            setProfile(u);
        });
    }

    useEffect(() => {
        getUser(props.match?.params.id);
    }, [props.match?.params.id]);

    const dataBox = () => {
        if (profile?.posts?.length) {
            return profile.posts.map((post, index) => {
                return <PostBox obj={post} key={index} classList={"w-30 m-2"}/>;
            });
        }
    };

    const updateSkills = (newSkill) => {
        let user = profile;
        user.skills.push(newSkill);

        UserService.EditUser(user.email, user).then(res => {
            setProfile(res);
            setSkills(res.skills);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="profile">
            <header>
                <h1>{profile?.name}'s Profile</h1>
            </header>
            <div className="flex-container">
                {profile?.picture &&
                <div className="profile-image">
                    <img src={profile?.picture} alt="Profile"/>
                </div>}
                <div id="user-details">
                    <div>
                        <h2>{profile?.name}</h2>
                        <h4>{profile?.email}</h4>
                        {skills?.length > 0 &&
                        (<div id="tags">
                            {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}
                        </div>)}
                        {skills?.length === 0 &&
                        (<div>No skills added yet</div>)}
                    </div>
                    {isAuthenticated && profile?.email === user.email &&
                    <div id="add-skills">
                        <h5>Add Skills</h5>
                        <Skills updateSkills={updateSkills}/>
                    </div>}
                </div>
                <div className="user-posts">
                    <h3>My Recent Posts</h3>
                    <div id="cards-container">
                        {dataBox()}
                    </div>
                    <MyCalendar/>
                </div>
            </div>
        </div>
    );
};

export default Profile;