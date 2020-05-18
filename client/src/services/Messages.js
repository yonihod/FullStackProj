import axios from 'axios';

export default class MessagesService {
    static MESSAGES_API = `${process.env.REACT_APP_API_URL}/messages`;

    static AddMessage(message) {
        return axios.post(this.MESSAGES_API, message)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static DeleteMessage(messageId) {
        return axios.delete(`${this.MESSAGES_API}/${messageId}`, messageId)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}