import axios from 'axios';

export default class RoomsService {
    static ROOMS_API = `${process.env.REACT_APP_API_URL}/rooms`;

    // get all the rooms and messages that belongs a user
    static getCurrentUserRooms(userEmail) {
        return axios.get(`${this.ROOMS_API}/list/${userEmail}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static addRoom(room) {
        return axios.post(this.ROOMS_API, room)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static addNewMessage(roomId, message, sender) {
        return axios.put(`${this.ROOMS_API}/new-message/${roomId}`, {msg: message, sender: sender})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static deleteRoom(roomId) {
        return axios.delete(`${this.ROOMS_API}/${roomId}`, roomId)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}