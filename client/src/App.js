import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import CreatePublisher from "./components/create-publisher.component";
import EditPublisher from "./components/edit-publisher.component";
import PublisherList from "./components/list-publisher.component";

function App() {
    return (<Router>
        <div className="App">
            <header className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <Link to={"/create-publisher"} className="nav-link">
                                Developi
                            </Link>
                        </Navbar.Brand>

                        <Nav className="justify-content-end">
                            <Nav>
                                <Link to={"/create-publisher"} className="nav-link">
                                    Create Publisher
                                </Link>
                            </Nav>

                            <Nav>
                                <Link to={"/edit-publisher/:id"} className="nav-link">
                                    Edit Publisher
                                </Link>
                            </Nav>

                            <Nav>
                                <Link to={"/list-publisher"} className="nav-link">
                                    Publisher List
                                </Link>
                            </Nav>
                        </Nav>
                    </Container>
                </Navbar>
            </header>

            <Container>
                <Row>
                    <Col md={12}>
                        <div className="wrapper">
                            <Switch>
                                <Route exact path='/' component={CreatePublisher}/>
                                <Route path="/create-publisher" component={CreatePublisher}/>
                                <Route path="/edit-publisher/:id" component={EditPublisher}/>
                                <Route path="/list-publisher" component={PublisherList}/>
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </Router>);
}

export default App;