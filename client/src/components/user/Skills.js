import React, { useEffect, useState } from "react";
import SkillsService from "../../services/Skills";
//import Autocomplete from '@material-ui/lab/Autocomplete';
//import TextField from '@material-ui/core/TextField';
//import {default} from "react-bootstrap/cjs/BootstrapModalManager";
import {useAuth0} from "../../reactAuth0";
import UserService from "../../services/Users";
import {MultiSelect} from '@progress/kendo-react-dropdowns';

const Skills = () => {

    const [skillsList, setSkillsList] = useState([]);
    const {loading, user} = useAuth0();
    const [userSkills, setUserSkills] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        SkillsService.getSkills().then(res => {
            setSkillsList(res);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        UserService.getUserByEmail(user.email).then(res => {
            setUserSkills(res.skills);
            return res;
        }).catch(err => {
            console.log(err);
            return [];
        });
    }, []);

    const saveSkills = (skills, e) => {
        console.log(skillsList);
        console.log(skills);
        // TODO store skills in DB
    };

    const onChange = (event) => { console.log("change"); };
    const onFilterChange = (event) => { console.log("filtered"); };


    console.log(skillsList[1]?.name);
    return (
        <div>
            <MultiSelect
                data={skillsList}
                onChange={onChange}
                onFilterChange={onFilterChange}
                filterable={true}
                style={{ width: '400px' }}
            />
        </div>


    // {/*//     {skillsList} &&*/}
    // {/*//     (<Autocomplete*/}
    // {/*//         multiple*/}
    // {/*//         id="tags-standard"*/}
    // {/*//         defaultValue={["QA"]}*/}
    // {/*//         options={skillsList}*/}
    // {/*//         autoSelect={true}*/}
    // {/*//         getOptionLabel={(option) => option.name}*/}
    // {/*//         onChange={(e, skills) => {*/}
    // {/*//             skillsList.push(skills);*/}
    // {/*//             saveSkills(skills,e)*/}
    // {/*//         }}*/}
    // {/*//         renderInput={(params) => (*/}
    // {/*//             <TextField*/}
    // {/*//                 {...params}*/}
    // {/*//                 variant="standard"*/}
    // {/*//               //  label="Multiple values"*/}
    // {/*//               //  placeholder="Favorites"*/}
    // {/*//             />*/}
    // {/*//         )}*/}
    // {/*//     />)*/}
     )
};

export default Skills;


{/*// import React, {Component, useEffect, useState} from "react";*/}
{/*// import {Badge} from "react-bootstrap";*/}
{/*// import Autosuggest from 'react-autosuggest';*/}
{/*// import SkillsService from "../../services/Skills";*/}
{/*// import PostsService from "../../services/Posts";*/}
{/*// import UserService from "../../services/Users";*/}
{/*// import ReactTags from 'react-tag-autocomplete'*/}
{/*//*/}
{/*// const Skills = (props) => {*/}
{/*//*/}
{/*//     const [skills, setSkills] = useState([]);*/}
{/*//     const [suggestions, setSuggestions] = useState([]);*/}
{/*//     const [value, setValue] = useState('');*/}
{/*//    // const [chosen, setChosen] = useState('');*/}
{/*//    //  const [userEmail, setUserEmail] = useState('');*/}
{/*//    //  const [userSkills, setUserSkills] = useState([])*/}
{/*//*/}
{/*//     useEffect(() => {*/}
{/*//         SkillsService.getSkills().then(res => {*/}
{/*//             setSkills(res);*/}
{/*//         }).catch(err => {*/}
{/*//             console.log(err);*/}
{/*//         });*/}
{/*//         // if (props !== undefined) {*/}
{/*//         //     setUserEmail(props.userEmail);*/}
{/*//         //     setUserSkills(props.userSkills);*/}
{/*//         // }*/}
{/*//         }, [skills.length]);*/}
{/*//*/}
{/*//*/}
{/*//     const escapeRegexCharacters = (str) => {*/}
{/*//         return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');*/}
{/*//     };*/}
{/*//*/}
{/*//     const getSuggestions = (value) => {*/}
{/*//         const escapedValue = escapeRegexCharacters(value.trim());*/}
{/*//*/}
{/*//         if (escapedValue === '') {*/}
{/*//             return [];*/}
{/*//         }*/}
{/*//         const regex = new RegExp('^' + escapedValue, 'i');*/}
{/*//*/}
{/*//         return skills.filter(skill => regex.test(skill.name));*/}
{/*//     };*/}
{/*//*/}
{/*//     const getSuggestionValue = (suggestion) => {*/}
{/*//         return suggestion.name;*/}
{/*//     };*/}
{/*//*/}
{/*//     const renderSuggestion = (suggestion) => {*/}
{/*//         return (*/}
{/*//             <ReactTags tags={suggestion}/>*/}
{/*//         );*/}
{/*//     };*/}
{/*//*/}
{/*//     const onChange = (event, {newValue, method}) => {*/}
{/*//         setValue(newValue);*/}
{/*//     };*/}
{/*//*/}
{/*//     const onSuggestionsFetchRequested = ({value}) => {*/}
{/*//         setSuggestions(getSuggestions(value));*/}
{/*//     };*/}
{/*//*/}
{/*//     const onSuggestionsClearRequested = () => {*/}
{/*//         setSuggestions([]);*/}
{/*//     };*/}
{/*//*/}
{/*//     const onSuggestionSelected = (event, data) => {*/}
{/*//         props.updateSkills(data.suggestion);*/}
{/*//         setValue('');*/}
{/*//     };*/}
{/*//*/}
{/*//     const inputProps = {*/}
{/*//         value,*/}
{/*//         onChange: onChange*/}
{/*//     };*/}
{/*//*/}
{/*//     return (*/}
{/*//         <div id="auto-suggest">*/}
{/*//             <Autosuggest*/}
{/*//                 suggestions={suggestions}*/}
{/*//                 onSuggestionsFetchRequested={onSuggestionsFetchRequested}*/}
{/*//                 onSuggestionsClearRequested={onSuggestionsClearRequested}*/}
{/*//                 getSuggestionValue={getSuggestionValue}*/}
{/*//                 onSuggestionSelected={onSuggestionSelected}*/}
{/*//                 renderSuggestion={renderSuggestion}*/}
{/*//                 inputProps={inputProps}/>*/}
{/*//         </div>*/}
{/*//     );*/}
{/*// };*/}
{/*//*/}
{/*// export default Skills;*/}