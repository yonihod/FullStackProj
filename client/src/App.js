import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
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

function App() {
    const {isAuthenticated, loading, user} = useAuth0();

    if (loading) {
        return   (
            <div className={"spinner"}>
                <Spinner animation="border" variant="primary" />
            </div>
            );
    }

    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar/>
                </header>
                <Container>
                    <div className="wrapper">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/posts/:id" component={SinglePost}/>
                            <Route path="/posts" component={ListPosts}/>
                            <Route path="/service-providers" component={ListUsers}/>
                            <PrivateRoute authed={isAuthenticated} path="/create-post" component={CreatePost} user={user}/>
                            <PrivateRoute authed={isAuthenticated} path="/edit-post/:id" component={EditPost}/>
                            <Route path="/about-us" component={About}/>
                            <PrivateRoute authed={isAuthenticated} path="/profile" component={Profile}/>
                        </Switch>
                    </div>
                </Container>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;