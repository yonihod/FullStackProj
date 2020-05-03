import React, {Component, useState} from "react";
import {Badge} from "react-bootstrap";
import Autosuggest from 'react-autosuggest';
import SkillsService from "../../services/Skills";



const Skills = () => {

    const [skills, setSkills] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    SkillsService.getSkills().then(res => {
        setSkills(res);
        return res;
    }).catch(err => {
        console.log(err);
        return [];
    });


    const escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');

        return skills.filter(skill => regex.test(skill.name));
    }

    const getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    const renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.name}</span>
        );
    }

    const onChange = (event, { newValue, method }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
            setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
            setSuggestions([]);
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
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} />
        </div>
    );
}

export default Skills;