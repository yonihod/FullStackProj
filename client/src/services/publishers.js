export default class PublishersService {
    static PUBLISHERS_API = `${process.env.REACT_APP_API_URL}/publishers`;

    static getPublishers() {
        fetch(this.PUBLISHERS_API)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}