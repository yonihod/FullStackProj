import React from "react";
import {Switch, Route} from "react-router-dom";

import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Home from "./components/common/Home";
import ListPosts from "./components/post/ListPost";
import SinglePost from "./components/post/SinglePost";
import CreatePost from "./components/post/CreatePost";
import About from "./components/common/About";
import Register from "./components/common/Register";
import Login from "./components/common/Login";

import NavBar from "./components/common/NavBar";
import {useAuth0} from "./react-auth0-spa";

function App() {
    const {loading} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <header>
                <NavBar/>
            </header>
            <Container>
                <div className="wrapper">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/posts/:id" component={SinglePost}/>
                        <Route exact path="/posts" component={ListPosts}/>
                        <Route path="/create-post" component={CreatePost}/>
                        <Route path="/about-us" component={About}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </div>
            </Container>
        </div>
    );
}

export default App;