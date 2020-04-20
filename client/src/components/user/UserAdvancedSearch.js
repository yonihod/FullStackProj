import React, {useState, useReducer, useEffect} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";

export default function UserAdvancedSearch(props) {

    const [user, updateUser] = useState({"enable": false, "value": ""});
    const [skills, updateSkills] = useState({"enable": false, "value": ""});
    const [email, updateEmail] = useState({"enable": false, "value": ""});
    const [toggle, toggleAdvancedSearch] = useState(props?.show);

    useEffect(() => {
        toggleAdvancedSearch(props?.show);
    });

    const close = () => {
        props.close();
    };

    const handleChange = (e, f) => {
        f({"enable": true, "value": e.target.value});
    };

    const handleSearch = () => {
        // prep query to send to father component
        let query = {};
        if (user?.enable && user.value !== "") {
            query['name'] = {$regex: user.value, $options: "$i"}

        }
        if (skills?.enable && skills.value !== "") {
            query['skills'] = {$regex: skills.value, $options: "$i"}

        }
        if (email?.enable && email.value !== "") {
            query['email'] = {$regex: email.value, $options: "$i"}

        }
        props.search(query);
    };

    return (
        <div id={"advanced-search-container"} className={`${toggle ? "toggle-advanced-search" : ""} w-100 m-auto`}>
            <div className={"advanced-search text-left p-3 pt-4 pb-4 border"}>
                <h5 className={"text-center"}>Advanced Search</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => close()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className={"search-wrapper"}>
                    <div className={"w-100 p-2"}>
                        <label htmlFor="user">User:</label>
                        <InputGroup id="user" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateUser({enable: !user.enable, value: user.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Search for user name here" aria-label="Text input with checkbox"
                                         disabled={!user.enable} onChange={e => handleChange(e, updateUser)}/>
                        </InputGroup>
                        <label htmlFor="service-provider">Email:</label>
                        <InputGroup id="service-provider" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateEmail({enable: !email.enable, value: email.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder={"Search for user email here..."}
                                         aria-label="Text input with checkbox" disabled={!email.enable}
                                         onChange={e => handleChange(e, updateEmail)}/>
                        </InputGroup>
                        <label htmlFor="skills">Skills:</label>
                        <InputGroup id="skills" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateSkills({enable: !skills.enable, value: skills.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Web Developer, Devops, Designer etc..."
                                         aria-label="Text input with checkbox" disabled={!skills.enable}
                                         onChange={e => handleChange(e, updateSkills)}/>
                        </InputGroup>
                    </div>
                </div>
                <div className={"text-right"}>
                    <Button id={"advanced-submit-button"} onClick={handleSearch} variant={"primary"} size={"lg"}><i
                        className={"fa fa-search"}></i> Search</Button>
                </div>
            </div>
        </div>
    );
}