import { Server, Socket } from "socket.io";
import UserManager from "../../services/UserManager";

export default class SocketUserHandler {
    private io: Server;
    userManager: UserManager;
    constructor(io: Server, userManager: UserManager) {
        this.io = io;
        this.userManager = userManager;
        this.handleUserConnection();
    }

    private handleUserConnection() {
        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected from user');

            socket.on('register', async (name: string) => {
                const user = await this.userManager.createUser(name);
                socket.emit('register', user);
            });
            socket.on('login', async (id: string) => {
                const user = await this.userManager.loginUser(id);
                socket.emit('login', user);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }


}