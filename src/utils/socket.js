import { io } from 'socket.io-client';

const socket = io(process.env.WS_HOST, {transports: ["websocket", "polling"], autoConnect: false, forceNew: true});

socket.on("connect_error", () => {
    console.error('failed to connect ws server');
    socket.io.opts.transports = ["polling", "websocket"];
});

export const initSocket = (user) => {
    socket.auth = {...user};
    socket.connect();
}

export const disconnectSocket = () => {
    socket.disconnect()
}

export const sendMessage = (to, message) => {
    socket.emit('private-message', {to, message});
}

export default socket;

