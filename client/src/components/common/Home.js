import React from 'react'
import {useAuth0} from "../../react-auth0-spa";

const Home = () => {
    const {isAuthenticated, user} = useAuth0();
    
        return (
            <div>
                Welcome {isAuthenticated ? user.given_name : "To Developi"}!
            </div>
        )
}

export default Home