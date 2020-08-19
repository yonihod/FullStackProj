import React, {useEffect, useState} from 'react'
import {useAuth0} from "../../reactAuth0";
import {Link} from "react-router-dom";
import UserService from "../../services/Users";

const Banner = (props) => {
    const {isAuthenticated, user} = useAuth0();
    const [hasSkills, showBanner] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            UserService.getUserByEmail(user.email).then(data => {
                showBanner(data.skills && data.skills.length > 0);
            }).catch(() => {
                showBanner(false);
            });
        }
    });

    return (
        <>
            {!hasSkills && isAuthenticated &&
            <div className="banner">
                Join us as a service provider! Let us know what are your skills and you're in!
                <Link className={"banner-link"} to={`/profile/${user.sub.split('|')[1]}`}>
                    Add Skills
                </Link>
            </div>
            }
        </>
    );
};

export default Banner;