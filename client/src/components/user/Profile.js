import React, {Fragment} from "react";
import {useAuth0} from "../../reactAuth0";
import { Link } from 'react-router-dom';
import Skills from "./Skills";

const Profile = () => {
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

    return (
        <Fragment>
            <h1>User Profile</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.skills}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
            <Skills/>
        </Fragment>
    );
};

export default Profile;