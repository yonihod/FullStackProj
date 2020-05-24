import axios from 'axios';

export default class RoomsService {
    static ROOMS_API = `${process.env.REACT_APP_API_URL}/rooms`;

    // get all the rooms and messages that belongs a user
    static getCurrentUserRooms(userId) {
        // return axios.get(`${this.ROOMS_API}/list/${userId}`, userId)
        //     .then((response) => {
        //         return response.data;
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        return axios.get(this.ROOMS_API)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    // get a specific room with messages
    static getRoom(roomId) {
        return axios.get(`${this.ROOMS_API}/${roomId}`, roomId)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static AddRoom(room) {
        return axios.post(this.ROOMS_API, room)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static DeleteRoom(roomId) {
        return axios.delete(`${this.ROOMS_API}/${roomId}`, roomId)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}