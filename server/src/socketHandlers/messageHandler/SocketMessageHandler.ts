import { Server, Socket } from "socket.io"
import UserConnectionService from "../../services/UserConnectionService";
import MessageManager from "../../services/MessageManager";

export default class SocketMessageHandler {
    private io: Server;
    messageManager: MessageManager;
    constructor(io: Server, messageManager: MessageManager) {
        this.io = io;
        this.messageManager = messageManager;
        this.handleUserConnection();
    }

    private handleUserConnection() {
        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected from user');


            socket.on('sendMessage', (data) => {
                this.io.to(data.room).emit('receiveMessage', data.message);
            });
            socket.on('disconnect', () => {
                console.log('user disconnected' + socket.id)
                UserConnectionService.disconnectUser(socket.id);

            });
        });
    }


}