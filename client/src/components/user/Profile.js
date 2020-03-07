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
        <div className={"profile"}>
            <h1>
                Profile
            </h1>
            <aside>
                {/*<img src={user.picture} alt="Profile"/>*/}
                <h2>{user.name}</h2>
                {user.email}
            </aside>
            <div>
                <Skills email={user.email}/>
            </div>
            <p>
                <code>{JSON.stringify(user, null, 2)}</code>
            </p>
        </div>

    );
};

export default Profile;