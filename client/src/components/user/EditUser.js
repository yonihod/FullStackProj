import React, {Component, useEffect, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import UserService from "../../services/Users";
import PostsService from "../../services/Posts";
import Skills from "./Skills";
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";

const EditUser = (props) => {

    const [userFromDB, setUserFromDB] = useState({});
    let [username, setUsername] = useState('');
    const [skills, setSkills] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        UserService.getUser(props.computedMatch.params.id).then(res => {
            setUserFromDB(res);
            setUsername(res.name);
            setSkills(res.skills);
            return res;
        }).catch(err => {
            console.log(err);
            return [];
        });
    }, []);

    function checkValidity() {
        return username.trim() !== "";
    }

    const updateSkills = (newSkill) => {

        // let user = userFromDB;
        // if (!user.skills?.includes(newSkill)) {
        //     user.skills.push(newSkill);
        //
        //     UserService.EditUser(user.email, user).then(res => {
        //         setUserFromDB(res);
        //         setSkills(res.skills);
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // }


        let user = userFromDB;
        if (!user.skills?.includes(newSkill)) {
            //user.skills.push(newSkill);
            skills.push(newSkill);
            setSkills(skills);
            console.log(skills);
        }
        // else{
        //     const updatedSkills = user.skills.filter(skill => skill !== newSkill);
        //     setUserFromDB(prevState => {return {...prevState, skills: updatedSkills}});
        // }
    };

    const handleChange = e => {
        setUsername(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        userFromDB.name = username;

        UserService.EditUser(userFromDB.email, userFromDB).then(res => {
            setUserFromDB(res);
            setSkills(res.skills);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleCancel = e => {
       // e.preventDefault();
        window.history.back();

    }

    return (<div className="form-wrapper">
        <h1>Edit User Details</h1>
        {!submitted && (<Form onSubmit={handleSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} defaultValue={username} required/>
                </Form.Group>
                <div>Skills</div>
                <div id="tags">
                    {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}
                </div>
                <Skills updateSkills={updateSkills}/>

                {/*<Form.Group controlId="Skills">*/}
                {/*    <Form.Label>Skills</Form.Label>*/}
                {/*    /!*{skills?.length > 0 &&*!/*/}
                {/*    /!*(<div id="tags">*!/*/}
                {/*    /!*    {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}*!/*/}
                {/*    /!*</div>)}*!/*/}
                {/*    <Form.Control type="text" defaultValue={<div id="tags">*/}
                {/*        {skills.map(t => <Badge className="mr-1 badge" key={t.name}>{t.name}</Badge>)}*/}
                {/*    </div>}/>*/}
                {/*    <Skills updateSkills={updateSkills}/>*/}
                {/*</Form.Group>*/}



            {/*<Form.Group controlId="Skills">*/}
            {/*    <Form.Label>Roll No</Form.Label>*/}
            {/*    <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeUserRollno}/>*/}
            {/*</Form.Group>*/}

                <Button variant="warning" size="lg" block="block" type="button" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" size="lg" block="block" type="submit">
                    Update User
                </Button>
            </Form>)}
        {submitted &&
        (
            <div>
                <h4>User Updated Successfully!</h4>
                <Link className={"edit"} to={`/profile/${userFromDB._id}`}>
                Back To Profile
                </Link>
            </div>)}
        </div>);
};

export default EditUser;