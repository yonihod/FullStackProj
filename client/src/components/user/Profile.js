import React, {useEffect, useState,useContext} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostBox from "../post/PostBox";
import {Badge} from "react-bootstrap";
import Skills from "../user/Skills";
import Spinner from "react-bootstrap/Spinner";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);
const myEventsList = [
    {
        id: '5edd35d87029e4303d50d878',
        start: '2020-05-20',
        end: '2020-06-02',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        id: '5edd35d87029e4303d50d878',
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
     //   data: 'you can add what ever random data you may want to use later',
    }
];

const Profile = (props) => {
    const history = useHistory();

    const goToPost = (e) => {
        let path = `/posts/${e.id}`;
        history.push(path);
    }

    const MyCalendar = props => (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={event => goToPost(event)}
            />
        </div>
    );

    const [profile, setProfile] = useState();
    const [skills, setSkills] = useState([]);
    const {loading, user, isAuthenticated} = useAuth0();

    const getUser = (id) => {
        UserService.getUser(id).then(u => {
            setProfile(u);
        });
    
    }

    // const getUserTasks = (id) => {
    // get users posts and assigned task
    // and map it to the events list
    // }

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