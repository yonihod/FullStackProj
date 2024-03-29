import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {Router, Route, Switch} from "react-router-dom";

import history from "./utils/history";
import {useAuth0} from "./reactAuth0";

import NavBar from "./components/common/navbar/NavBar";
import PrivateRoute from "./components/common/privateRoute/PrivateRoute";
import Home from "./components/common/Home";
import Profile from "./components/user/Profile";
import ListUsers from "./components/user/ListUser";
import ListPosts from "./components/post/ListPost";
import EditPost from "./components/post/EditPost";
import CreatePost from "./components/post/CreatePost";
import SinglePost from "./components/post/SinglePost";
import About from "./components/common/About";
import Footer from "./components/common/Footer";
import Spinner from "react-bootstrap/Spinner"
import EditUser from "./components/user/EditUser";
import Room from "./components/room/RoomPage";
import UserContext from "./context/AppContext";
import UserService from "./services/Users";

function App() {
    const {isAuthenticated, loading, user} = useAuth0();
    const [dbUser, setDbUser] = useState([]);
    const value = {dbUser, setDbUser};

    if (loading) {
        return (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    if (user && isAuthenticated && dbUser == "") {
        UserService.getUserByEmail(user.email).then(res => {
            setDbUser(res);
            return res;
        }).catch(err => {
            console.log(err);
            return [];
        });
    }


    return (
        <UserContext.Provider value={value}>
            <div className="App">
                <Router history={history}>
                    <header>
                        <NavBar/>
                    </header>
                    <Route exact path="/" component={Home}/>
                    <Container>
                        <div className="wrapper">
                            <Switch>
                                <Route path="/posts/:id" component={SinglePost}/>
                                <Route path="/posts" component={ListPosts}/>
                                <Route path="/service-providers" component={ListUsers}/>
                                <PrivateRoute authed={isAuthenticated} path="/create-post" component={CreatePost}
                                              user={user}/>
                                <PrivateRoute authed={isAuthenticated} currentUser={user} path="/edit-post/:id"
                                              component={EditPost}/>
                                <PrivateRoute authed={isAuthenticated} currentUser={user} path="/edit-user/:id"
                                              component={EditUser}/>
                                <Route path="/about-us" component={About}/>
                                <Route path="/profile/:id" component={Profile}/>
                                <PrivateRoute authed={isAuthenticated} path="/rooms" component={Room}/>
                            </Switch>
                        </div>
                    </Container>
                    <Footer/>
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;