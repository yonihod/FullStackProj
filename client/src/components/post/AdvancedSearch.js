import React, {useState, useReducer, useEffect} from "react";
import {InputGroup,FormControl,FormGroup,Button} from "react-bootstrap";
import {DateRangeInput, DateSingleInput, Datepicker} from '@datepicker-react/styled'

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

    const [query , updateQuery] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [toggle,toggleAdvancedSearch] = useState(props?.show);
    let tags = "";
    let  duoDate = "";
    useEffect( ()=> {
        toggleAdvancedSearch(props?.show);
    });

    const onDatesChange = ({ startDate, endDate }) => {
        console.log(({ startDate, endDate }));
    };

    return(
        <div id={"advanced-search-container"} className={`${toggle ? "toggle-advanced-search" : ""} w-100 p-3 m-auto`}>
            <div className={"advanced-search text-left p-3 pt-4 pb-4 border"}>
            <h5 className={"text-center"}>Advanced Search</h5>
            <div className={"search-wrapper"}>
                <div className={"w-50"}>
                    <label htmlFor="title">Title:</label>
                    <InputGroup id="title" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="select this to update query" />
                        </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
                    </InputGroup>
                    <label htmlFor="service-provider">Service Provider:</label>
                    <InputGroup id="service-provider" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="select this to update query" />
                        </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
                    </InputGroup>
                    <label htmlFor="tags">Tags:</label>
                    <InputGroup id="tags" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="select this to update query" />
                        </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
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
                <Button id={"advanced-submit-button"} className={""} variant={"primary"} size={"lg"}><i className={"fa fa-search"}></i> Search</Button>
            </div>
        </div>
        </div>
    );
}