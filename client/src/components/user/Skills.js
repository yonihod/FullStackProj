import React, {Component} from "react";
import UserService from "../../services/Users";


export default class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
    }

    // componentDidMount() {
    //     UserService.getUser(this.props.match.params.id).then(res => {
    //         this.setState({
    //             skills: JSON.parse(res).skills
    //         });
    //     }).catch(err => {
    //         console.log('There has been an error loading skills in skills-component: ' + err);
    //     });
    // }

    render() {
        return (
            <div>
                <ul>
                    {this.state.skills.map(skill => {
                        return <li>{skill[0]}</li>
                    })}
                </ul>
            </div>
        );
    }

    }