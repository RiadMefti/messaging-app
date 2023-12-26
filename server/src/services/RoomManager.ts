import Room from "../models/Room"
import RoomRepository from "../repositories/RoomRepository"




export default class RoomManager {
    private roomRepository: RoomRepository;
    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;

    }

    async createRoom(userName: string) {
        const uniqueRoomId = crypto.randomUUID()
        const room: Room = {
            roomId: uniqueRoomId,
            userName: userName,
            hidden: false
        }

        await this.roomRepository.create(room)

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



}