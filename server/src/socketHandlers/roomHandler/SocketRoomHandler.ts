import { Server, Socket } from "socket.io";
import RoomManager from "../../services/RoomManager";
import UserConnectionService from "../../services/UserConnectionService";

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
      

            socket.on('getRooms', async () => {
                const user = UserConnectionService.getUserBysocketID(socket.id)
                const rooms = await this.roomManager.getRooms(user?.name as string)
                socket.emit('joinRooms', rooms)

            })

            socket.on('joinRooms', (rooms) => {
                rooms.forEach((room: string) => {
                    socket.join(room)
                })

            })

            socket.on('createRoom', async (otherPersonUsername: string) => {

                const user = UserConnectionService.getUserBysocketID(socket.id)

                if (user) {
                    const otherPersonSocketId = await this.roomManager.createRoomWithUser(user.name, otherPersonUsername)
                    const user1Rooms = await this.roomManager.getRooms(user.name as string)

                    if (otherPersonSocketId != undefined) {
                        const user2Rooms = await this.roomManager.getRooms(otherPersonUsername)

                        socket.to(otherPersonSocketId).emit('joinRooms', user2Rooms)
                    }
                    socket.emit('joinRooms', user1Rooms)



                }

            })

            socket.on('disconnect', () => {
                console.log('user disconnected' + socket.id)


            });
        });
    }


}