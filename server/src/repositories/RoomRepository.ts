import { db as Db, eq, schema } from '../../database/SqLite';
import Room from '../models/Room';
import { ResponseStatus, RoomWithOtherPerson, Status } from '../types/Type';
export default class RoomRepository {
    private db: typeof Db;

    constructor(db: typeof Db) {
        this.db = db;
    }

    async create(room: Room): Promise<ResponseStatus> {
        try {
            await this.db.insert(schema.rooms).values({
                roomId: room.roomId,
                userName: room.userName,
                hidden: room.hidden,

            });
            return { status: Status.SUCCESS, message: "Room created" }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return { status: Status.ERROR, message: err.message }
            }
            return { status: Status.ERROR, message: 'An unknown error occurred' }
        }
    }

    async getUserFromRoom(roomId: string): Promise<Room[] | null> {
        try {
            const res = await this.db.select().from(schema.rooms).where(
                eq(schema.rooms.roomId, roomId)

            )

            if (res.length === 0) return null
            return res as Room[];

        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return null
            }
            return null
        }
    }
    async getRooms(userName: string): Promise<Room[] | null> {
        try {
            const res = await this.db.select().from(schema.rooms).where(
                eq(schema.rooms.userName, userName)

            )

            if (res.length === 0) return null
            return res as Room[];
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return null
            }
            return null
        }
    }

    async addUserToRoom(room: Room): Promise<ResponseStatus> {
        try {
            await this.db.insert(schema.rooms).values({
                roomId: room.roomId,
                userName: room.userName,
                hidden: room.hidden,

            });
            return { status: Status.SUCCESS, message: "Room created" }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return { status: Status.ERROR, message: err.message }
            }
            return { status: Status.ERROR, message: 'An unknown error occurred' }
        }
    }
    async deleteRoom(roomWithOtherPerson: RoomWithOtherPerson): Promise<ResponseStatus> {

        try {
            await this.db.delete(schema.rooms).where(
                eq(schema.rooms.roomId, roomWithOtherPerson.room.roomId)
            )
            return { status: Status.SUCCESS, message: "Room deleted" }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return { status: Status.ERROR, message: err.message }
            }
            return { status: Status.ERROR, message: 'An unknown error occurred' }
        }



    }
    async findPeopleInRoom(roomId: string): Promise<Room[] | null> {
        try {
            const res = await this.db.select().from(schema.rooms).where(
                eq(schema.rooms.roomId, roomId)

            )

            if (res.length === 0) return null
            return res as Room[];

        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return null
            }
            return null
        }
    }




}