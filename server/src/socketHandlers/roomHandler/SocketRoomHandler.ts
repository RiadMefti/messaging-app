import { Server, Socket } from "socket.io";
import RoomManager from "../../services/RoomManager";
import UserConnectionService from "../../services/UserConnectionService";
import Room from "../../models/Room";
import { RoomWithOtherPerson } from "../../types/Type";
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
                const roomsWithOtherUser = await this.roomManager.getRoomsWithOtherUser(user?.name as string, rooms as Room[])

                socket.emit('joinRooms', roomsWithOtherUser)

            })

            socket.on('joinRooms', (rooms) => {


                socket.join(rooms)



            })

            socket.on('deleteRoom', async (roomWithOtherPerson: RoomWithOtherPerson) => {
                console.log(roomWithOtherPerson)
                const user = UserConnectionService.getUserBysocketID(socket.id)
                await this.roomManager.deleteRoom(roomWithOtherPerson)

                if (user) {
                    
                    const user1Rooms = await this.roomManager.getRooms(user.name as string)
                  
                    const otherSocketId = UserConnectionService.getSocketIdByName(roomWithOtherPerson.otherPersonneInTheRoom)

                    if (otherSocketId != undefined) {
                        const user2Rooms = await this.roomManager.getRooms(roomWithOtherPerson.otherPersonneInTheRoom)
                        const roomsWithOtherUser2 = await this.roomManager.getRoomsWithOtherUser(roomWithOtherPerson.otherPersonneInTheRoom, user2Rooms as Room[])
                        socket.to(otherSocketId).emit('joinRooms', roomsWithOtherUser2)
                    }

                    const roomsWithOtherUser1 = await this.roomManager.getRoomsWithOtherUser(user.name as string, user1Rooms as Room[])

                    socket.emit('joinRooms', roomsWithOtherUser1)



                }



            })

            socket.on('createRoom', async (otherPersonUsername: string) => {

                const user = UserConnectionService.getUserBysocketID(socket.id)

                if (user) {
                    const otherPersonSocketId = await this.roomManager.createRoomWithUser(user.name, otherPersonUsername)
                    const user1Rooms = await this.roomManager.getRooms(user.name as string)

                    if (otherPersonSocketId != undefined) {
                        const user2Rooms = await this.roomManager.getRooms(otherPersonUsername)
                        const roomsWithOtherUser2 = await this.roomManager.getRoomsWithOtherUser(otherPersonUsername, user2Rooms as Room[])
                        socket.to(otherPersonSocketId).emit('joinRooms', roomsWithOtherUser2)
                    }

                    const roomsWithOtherUser1 = await this.roomManager.getRoomsWithOtherUser(user.name as string, user1Rooms as Room[])
                    console.log(roomsWithOtherUser1)
                    socket.emit('joinRooms', roomsWithOtherUser1)



                }

            })

            socket.on('disconnect', () => {
                console.log('user disconnected' + socket.id)


            });
        });
    }


}