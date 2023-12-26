import { Server, Socket } from "socket.io";
import RoomManager from "../../services/RoomManager";

export default class SocketRoomHandler {
    private io: Server;
    roomManager: RoomManager;
    constructor(io: Server, roomManager: RoomManager) {
        this.io = io;
        this.roomManager = roomManager;
        this.handleUserConnection();
    }

    private handleUserConnection() {
        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected from Room');

            socket.on('login', async (id: string) => {

            });

            socket.on('disconnect', () => {
                console.log('user disconnected' + socket.id)


            });
        });
    }


}