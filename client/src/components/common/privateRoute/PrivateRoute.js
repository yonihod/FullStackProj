// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { useAuth0 } from "../../../reactAuth0";
import { Route,withRouter } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const { isAuthenticated, loginWithRedirect} = useAuth0();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...rest} />
                ) : (
                        loginWithRedirect({})
                    )
            }
        />
    )
};

export default withRouter(PrivateRoute)