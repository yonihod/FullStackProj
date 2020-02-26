import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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


export default class App extends Component {
    render() {
        return (
            <>
                <header className="App-header">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <Link to={"/"} className="nav-link">Developi</Link>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav><Link to={"/posts"} className="nav-link">Posts</Link></Nav>
                            <Nav><Link to={"/create-post"} className="nav-link">Create a post</Link></Nav>
                            <Nav><Link to={"/about-us"} className="nav-link">About</Link></Nav>
                            <Nav><Link to={"/register"} className="nav-link">Register</Link></Nav>
                            <Nav><Link to={"/login"} className="nav-link">Login</Link></Nav>
                        </Nav>
                    </Navbar>
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
            </>
        );
    }
}
