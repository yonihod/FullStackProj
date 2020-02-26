import axios from 'axios';

export default class UserService {
    static USERS_API = `${process.env.REACT_APP_API_URL}/users`;

    static getUsers() {
        return axios.get(this.USERS_API)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getUser(userId) {
        return axios.get(`${this.USERS_API}/${userId}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static AddUser(user) {
        return axios.post(this.USERS_API, user)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}