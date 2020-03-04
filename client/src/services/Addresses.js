import axios from 'axios';

export default class UserService {
    static Addresses_API = `${process.env.REACT_APP_API_URL}/addresses`;

    static getAddresses() {
        return axios.get(this.Addresses_API)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getAddress(addressId) {
        return axios.get(`${this.Addresses_API}/${addressId}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static AddAddress(address) {
        return axios.post(this.Addresses_API, address)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}