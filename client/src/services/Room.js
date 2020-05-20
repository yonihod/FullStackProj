import axios from 'axios';

export default class RoomService {
    static ROOMS_API = `${process.env.REACT_APP_API_URL}/rooms`;

    static getRooms() {
        return axios.get(this.ROOMS_API)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getUserRooms(userId) {
        return axios.get(this.ROOMS_API,userId)
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
    static EditRoom(roomId, room) {
        return axios.put(`${this.ROOMS_API}/${roomId}`, room)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}