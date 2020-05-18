import axios from 'axios';

export default class SkillsService {
    static SKILLS_API = `${process.env.REACT_APP_API_URL}/skills`;

    static getSkills() {
        return axios.get(this.SKILLS_API)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}