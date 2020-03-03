import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import Container from "react-bootstrap/Container";
import {Router, Route, Switch} from "react-router-dom";
import {useAuth0} from "./react-auth0-spa";

import Profile from "./components/user/Profile";
import history from "./utils/history";
import Home from "./components/common/Home";
import ListPosts from "./components/post/ListPost";
import SinglePost from "./components/post/SinglePost";
import CreatePost from "./components/post/CreatePost";
import About from "./components/common/About";
import NavBar from "./components/common/navbar/NavBar";
import Footer from "./components/common/Footer";

function App() {
    const {loading} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
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
                        <Route path="/create-post" component={CreatePost}/>
                        <Route path="/about-us" component={About}/>
                        <Route path="/profile" component={Profile}/>

                    </Switch>
                </div>
            </Container>

                <Footer/>
                </Router>
        </div>
    );
}

export default App;