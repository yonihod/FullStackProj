import React, {useEffect, useState,useContext} from "react";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import PostService from "../../services/Posts";
import PostBox from "../post/PostBox";
import Skills from "../user/Skills";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Profile = (props) => {
    const history = useHistory();
    const localizer = momentLocalizer(moment);
    const [profile, setProfile] = useState();
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [publishedTasks, setPublishedTasks] = useState([]);
    const {user, isAuthenticated} = useAuth0();

    const goToPost = (e) => {
        let path = `/posts/${e.id}`;
        history.push(path);
    }

    const getUser = (id) => {
        UserService.getUser(id).then(u => {
            setProfile(u);
        });
    }

    const getUserTasks = async (id) => {
        const data = await PostService.getUserTasks(id);

        let userTasks = data.myTasks.map(function (task) {
            return {
                id: task._id,
                start: new Date(task.dueDate).toISOString().substring(0, 10),
                end: new Date(task.dueDate).toISOString().substring(0, 10),
                title: task.title
            }
        });

        let userPosts = data.myPosts.map(function (task) {
            return {
                id: task._id,
                start: new Date(task.dueDate).toISOString().substring(0, 10),
                end: new Date(task.dueDate).toISOString().substring(0, 10),
                title: task.title
            }
        });

        setAssignedTasks(userTasks);
        setPublishedTasks(userPosts);
    }

    useEffect(() => {
        getUser(props.match?.params.id);
        getUserTasks(props.match?.params.id);
    }, [props.match?.params.id]);

    const dataBox = () => {
        if (profile?.posts?.length) {
            return profile.posts.map((post, index) => {
                return <PostBox obj={post} key={index} classList={"w-30 m-2"}/>;
            });
        }
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
                    </div>
                    {isAuthenticated && profile?.email === user.email &&
                    <div id="add-skills">
                        <Skills userId={profile._id} userSkills={profile.skills}/>
                    </div>}
                </div>
            </div>
            <Tabs>
                <TabList>
                <Tab>My Posts</Tab>
                { isAuthenticated && profile?.email === user.email &&
                 <>
                 {/* find better titles */}
                    <Tab>Published Tasks</Tab>
                    <Tab>Assigned Tasks</Tab>
                 </>}
                </TabList>
                <TabPanel>
                    <div className="user-posts">
                        <h3>My Recent Posts</h3>
                        <div id="cards-container">
                            {dataBox()}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <Calendar
                        localizer={localizer}
                        events={publishedTasks}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 400 }}
                        onSelectEvent={event => goToPost(event)}
                    />
                </TabPanel>
                <TabPanel>
                    <Calendar
                        localizer={localizer}
                        events={assignedTasks}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 400 }}
                        onSelectEvent={event => goToPost(event)}
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Profile;