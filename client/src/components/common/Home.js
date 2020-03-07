import React from 'react'
import {useAuth0} from "../../reactAuth0";

const Home = () => {
    const {isAuthenticated, user} = useAuth0();
    
        return (
            <div className={"home"}>
                <h1>
                    Welcome {isAuthenticated ? user.given_name : "To Developi"}!
                </h1>
                <aside>
                    <video autoPlay muted loop id="home-video">
                        <source src="home-video.mp4" type="video/mp4"/>
                    </video>
                </aside>
            </div>
        )
};

export default Home