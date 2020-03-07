import React, {Component} from "react";
import UserService from "../../services/Users";


export default class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
        console.log(this.props.email);
    }

    componentDidMount() {
        UserService.getUserByEmail(this.props.email).then(res => {
            console.log(res);
            this.setState({
                skills: res.skills
            });
        }).catch(err => {
            console.log('There has been an error loading skills in skills-component: ' + err);
        });
    }



    render() {
        return (
            <div>
                <ul>
                    {/*{this.state.skills.map(skill => {*/}
                    {/*    return <li>{skill[0]}</li>*/}
                    {/*})}*/}
                    {this.state.skills}
                </ul>
            </div>
        );
    }

    }