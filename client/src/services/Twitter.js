import axios from 'axios';

export default class TwitterService {
    static twitter_api = `${process.env.REACT_APP_API_URL}/twitter`;

    static postTwit(post) {
        return axios.post(this.twitter_api, post)
            .then((response) => {
                debugger;
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}