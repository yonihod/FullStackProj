import * as io from 'socket.io-client';

export default class SocketService {

    static socket = io(process.env.REACT_APP_API_URL);

    static emit(event, data) {
        this.socket.emit(event, data);
    }

    static on(event, callback) {
        this.socket.on(event, callback);
    }
}