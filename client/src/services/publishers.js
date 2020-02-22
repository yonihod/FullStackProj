import axios from 'axios';

export default class PublishersService {
    static PUBLISHERS_API = `${process.env.REACT_APP_API_URL}/publishers`;

    static getPublishers() {
         return axios.get(this.PUBLISHERS_API)
            .then( (response)=> {
                console.log(response.data);
                console.log('Received Publisher')
                return response.data
            }).catch( (error) => {
            console.log(error)
        });
    }
}