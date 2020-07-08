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
    static setSkills(userId, skills) {
        const body = {userId, skills};
        
        return axios.put(this.SKILLS_API, body)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}