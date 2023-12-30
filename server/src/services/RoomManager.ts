import Room from "../models/Room"
import RoomRepository from "../repositories/RoomRepository"
import { RoomWithOtherPerson } from "../types/Type";
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

    public async getRoomsWithOtherUser(userName: string, rooms: Room[]): Promise<RoomWithOtherPerson[]> {
        if (!rooms) return []
        let roomsWithOtherUser: RoomWithOtherPerson[] = []

        for (let room of rooms) {
            let roomWithOtherPerson = await this.getOtherUserInRoom(userName, room.roomId)
            if (roomWithOtherPerson) {
                roomsWithOtherUser.push(roomWithOtherPerson)
            }


        }

        return roomsWithOtherUser
    }





    async getOtherUserInRoom(userName: string, roomId: string): Promise<RoomWithOtherPerson | null> {
        const users = await this.roomRepository.getUserFromRoom(roomId)
        if (users) {
            const otherPersonneInTheRoom = users.filter(user => user.userName !== userName)[0].userName
            const room = users.filter(user => user.userName === userName)[0]
            return { room, otherPersonneInTheRoom }
        }
        return null
    }

    async addUserToRoom(userName: string, roomId: string) {
        const room: Room = {
            roomId: roomId,
            userName: userName,
            hidden: false
        }

        await this.roomRepository.addUserToRoom(room)


    }

    async deleteRoom(roomWithOtherPerson: RoomWithOtherPerson) {
        await this.roomRepository.deleteRoom(roomWithOtherPerson)
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