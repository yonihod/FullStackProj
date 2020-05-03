import React, { useEffect, useState } from 'react'
import { useAuth0 } from "../../reactAuth0";
import { Link } from "react-router-dom";
import UserService from "../../services/Users";

const Banner = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const [hasSkills, showBanner] = useState(false);

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
                    Service providers with skills are more likely to find a Task!
                    <Link className={"banner-link"} to={`/profile`}>
                        Add skills now!
                    </Link>
                </div>
            }
        </>
    );
};

export default Banner;