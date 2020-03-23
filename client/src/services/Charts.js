import axios from 'axios';

export default class ChartsService {
    static CHARTS_API = `${process.env.REACT_APP_API_URL}`;

    static getMostPopularPosts() {
        return axios.get(`${this.CHARTS_API}/commonTags`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getMostActiveUsers() {
        return axios.get(`${this.CHARTS_API}/activeUsersPosts`)
            .then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
            });
    }
}