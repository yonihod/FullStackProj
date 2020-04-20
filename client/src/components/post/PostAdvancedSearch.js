import React, {useState, useReducer, useEffect} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {DateRangeInput} from '@datepicker-react/styled'

const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'focusChange':
            return {...state, focusedInput: action.payload}
        case 'dateChange':
            return action.payload
        default:
            throw new Error()
    }
}

export default function AdvancedSearch(props) {

    const [title, updateTitle] = useState({"enable": false, "value": ""});
    const [tags, updateTags] = useState({"enable": false, "value": ""});
    const [owner, updateOwner] = useState({"enable": false, "value": ""});
    const [desc, updateDesc] = useState({"enable": false, "value": ""});
    const [state, dispatch] = useReducer(reducer, initialState);
    const [toggle, toggleAdvancedSearch] = useState(props?.show);

    useEffect(() => {
        toggleAdvancedSearch(props?.show);
    });

    const close = () => {
        props.close();
    };

    const onDatesChange = ({startDate, endDate}) => {
        console.log(({startDate, endDate}));
    };

    const handleChange = (e, f) => {
        f({"enable": true, "value": e.target.value});
    };

    const handleSearch = () => {
        // prep query to send to father component
        let query = {};
        if (title?.enable && title.value !== "") {
            query['title'] = {$regex: title.value, $options: "$i"}

        }
        if (tags?.enable && tags.value !== "") {
            query['tags'] = {$regex: tags.value, $options: "$i"}

        }
        if (owner?.enable && owner.value !== "") {
            query['owner'] = {$regex: owner.value, $options: "$i"}

        }
        if (desc?.enable && desc.value !== "") {
            query['description'] = {$regex: desc.value, $options: "$i"}

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
                    <div className={"w-50"}>
                        <label htmlFor="title">Title:</label>
                        <InputGroup id="title" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateTitle({enable: !title.enable, value: title.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Your question" aria-label="Text input with checkbox"
                                         disabled={!title.enable} onChange={e => handleChange(e, updateTitle)}/>
                        </InputGroup>
                        <label htmlFor="Description">Description:</label>
                        <InputGroup id="Description" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateDesc({enable: !desc.enable, value: desc.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Search in text" aria-label="Text input with checkbox"
                                         disabled={!desc.enable} onChange={e => handleChange(e, updateDesc)}/>
                        </InputGroup>
                        <label htmlFor="service-provider">Post Publisher:</label>
                        <InputGroup id="service-provider" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateOwner({enable: !owner.enable, value: owner.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder={"Search for specific publisher here..."}
                                         aria-label="Text input with checkbox" disabled={!owner.enable}
                                         onChange={e => handleChange(e, updateOwner)}/>
                        </InputGroup>
                        <label htmlFor="tags">Tags:</label>
                        <InputGroup id="tags" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="select this to update query" onChange={() => {
                                    updateTags({enable: !tags.enable, value: tags.value})
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Javascript, Python, .NET etc..."
                                         aria-label="Text input with checkbox" disabled={!tags.enable}
                                         onChange={e => handleChange(e, updateTags)}/>
                        </InputGroup>
                    </div>
                    <div className={"duo-date"}>
                        <label htmlFor="">Due Date:</label>
                        <DateRangeInput
                            onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
                            onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
                            startDate={state.startDate} // Date or null
                            endDate={state.endDate} // Date or null
                            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
                            showResetDates={false}
                        />
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