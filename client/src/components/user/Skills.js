import React, {Component} from "react";
import UserService from "../../services/Users";


export default class Skills extends Component {
    constructor(props) {
        super(props);
        let skills = [];
        let email = '';

        if(props !== undefined ){
            email = props.email;
        }

        this.state = {
            email: email,
            skills: skills
        };

    }

    componentDidMount() {
        UserService.getUserByEmail(this.state.email).then(res => {
            this.setState({
                skills: res.skills
            });
        }).catch(err => {
            console.log('There has been an error loading skills in skills-component: ' + err);
        });

    }



    render() {
        const skills =  this.state.skills.map(function(object, i) {
            return <div>{object.name}</div>;
        });

        return (
            <div>
                <ul>
                    {skills}
                </ul>
            </div>
        );
    }
}