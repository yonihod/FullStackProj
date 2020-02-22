import axios from 'axios'

export default class PublishersService {
    static PUBLISHERS_API = `${process.env.REACT_APP_API_URL}/publishers`;

    static getPublishers() {
        return fetch(this.PUBLISHERS_API)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            })
    }
}