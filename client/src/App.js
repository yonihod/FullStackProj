import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUser from "./components/create-user.component";
import UserList from "./components/list-user.component";
import Login from "./components/login.component";
import EditUser from "./components/edit-user.component";
import Home from "./components/home.component";
import About from "./components/about.component";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>
                  <Link to={"/login"} className="nav-link">
                    Sign in
                  </Link>
                </Navbar.Brand>
                <Navbar.Brand>
                  <Link to={"/"} className="nav-link">
                    Developi
                  </Link>
                </Navbar.Brand>
                <Nav>
                  <Link to={"/create-user"} className="nav-link">
                    Create User
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/list-user"} className="nav-link">
                    User List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/about"} className="nav-link">
                    About Us
                  </Link>
                </Nav>
              </Container>
            </Navbar>
          </header>
          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/create-user" component={CreateUser} />
                    <Route path="/list-user" component={UserList} />
                    <Route path="/edit-user" component={EditUser} />
                    <Route path="/about" component={About} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}
