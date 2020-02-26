import React from "react";
import {Router, Route, Switch} from "react-router-dom";

import Profile from "./components/user/Profile";
import history from "./utils/history";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Home from "./components/common/Home";
import ListPosts from "./components/post/ListPost";
import SinglePost from "./components/post/SinglePost";
import CreatePost from "./components/post/CreatePost";
import About from "./components/common/About";

import NavBar from "./components/common/NavBar";
import {useAuth0} from "./react-auth0-spa";

function App() {
    const {loading} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div className="App">
        <Router history={history}>
            <header>
                <NavBar/>
            </header>
            <Switch>
                <Route path="/" exact/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </Router>
        <Container>
            <div className="wrapper">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/posts/:id" component={SinglePost}/>
                    <Route exact path="/posts" component={ListPosts}/>
                    <Route path="/create-post" component={CreatePost}/>
                    <Route path="/about-us" component={About}/>
                </Switch>
            </div>
        </Container>
    </div>;
}

export default App;