const socketIo = require('socket.io');

let io = null;

exports.io = function () {
    return io;
};

exports.initSocket = function(server) {
    return io = socketIo(server);
};