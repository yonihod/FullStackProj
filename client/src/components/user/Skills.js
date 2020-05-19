import React, {useEffect, useState} from "react";
import Autosuggest from 'react-autosuggest';
import SkillsService from "../../services/Skills";

const Skills = (props) => {

    const [skills, setSkills] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
   // const [chosen, setChosen] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userSkills, setUserSkills] = useState([])

    useEffect(() => {
        SkillsService.getSkills().then(res => {
            setSkills(res);
        }).catch(err => {
            console.log(err);
        });
        if (props !== undefined) {
            setUserEmail(props.userEmail);
            setUserSkills(props.userSkills);
        }
        }, [skills.length]);


    const escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');

        return skills.filter(skill => regex.test(skill.name));
    };

    const getSuggestionValue = (suggestion) => {
        return suggestion.name;
    };

    const renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.name}</span>
        );
    };

    const onChange = (event, {newValue, method}) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, data) => {
        props.updateSkills(data.suggestion);
        setValue('');

    };

    const inputProps = {
        value,
        onChange: onChange
    };

    return (
        <div id="auto-suggest">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}/>
        </div>
    );
};

export default Skills;