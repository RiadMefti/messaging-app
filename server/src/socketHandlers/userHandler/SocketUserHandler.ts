import { Server, Socket } from "socket.io";

export default class SocketUserHandler {
    private io: Server;
    constructor(io: Server) {
        this.io = io;
        this.handleUserConnection();
    }

    private handleUserConnection() {
        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected from user');

            socket.on('register', (name: string) => {

            });
            socket.on('login', (id: string) => {

            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }


}