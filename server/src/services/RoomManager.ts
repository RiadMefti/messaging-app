import Room from "../models/Room"
import RoomRepository from "../repositories/RoomRepository"
import UserConnectionService from "./UserConnectionService";




export default class RoomManager {
    private roomRepository: RoomRepository;
    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;

    }
    async getRooms(userName: string): Promise<Room[] | null> {


        const rooms = await this.roomRepository.getRooms(userName)
        return rooms
    }
    async createRoom(userName: string): Promise<string> {
        const uniqueRoomId = crypto.randomUUID()
        const room: Room = {
            roomId: uniqueRoomId,
            userName: userName,
            hidden: false
        }

        await this.roomRepository.create(room)

        return uniqueRoomId

    }

    async addUserToRoom(userName: string, roomId: string) {
        const room: Room = {
            roomId: roomId,
            userName: userName,
            hidden: false
        }

        await this.roomRepository.addUserToRoom(room)

    }

    async deleteUserFromRoom(userName: string, roomId: string) {
        const room: Room = {
            roomId: roomId,
            userName: userName,
            hidden: false
        }

        await this.roomRepository.deleteUserFromRoom(room)

    }

    async createRoomWithUser(userName: string, otherPersonUsername: string): Promise<string | undefined> {

        const uniqueRoomId = await this.createRoom(userName) 
        const roomUser2: Room = {
            roomId: uniqueRoomId,
            userName: otherPersonUsername,
            hidden: false
        }

   
        await this.roomRepository.addUserToRoom(roomUser2)
        const otherUserSocketId = UserConnectionService.getSocketIdByName(otherPersonUsername)
        if (otherUserSocketId) {
            return otherUserSocketId
        }
        return undefined

    }



}