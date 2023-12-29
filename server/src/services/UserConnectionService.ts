import User from "../models/User";
import { ResponseStatus, Status } from "../types/Type";

type socketId = string;
export default class UserConnectionService {
    static users = new Map<socketId, User>();
    static connectUser(socketId: string, user: User): ResponseStatus {
        if (UserConnectionService.users.has(socketId)) {

            return { status: Status.ERROR, message: "User already connected" }
        }
        else {
            UserConnectionService.users.set(socketId, user)

            return { status: Status.SUCCESS, message: "User added" }
        }
    }
    static getUserBysocketID(socketId: string): User | null {
        if (UserConnectionService.users.has(socketId)) {
            return UserConnectionService.users.get(socketId) as User
        }
        else {
            return null
        }
    }

    static getSocketIdByName(name: string): string | null {
        for (const [key, value] of UserConnectionService.users.entries()) {
            if (value.name === name) {
                return key
            }
        }
        return null
    }

    static disconnectUser(socketId: string) {
        if (UserConnectionService.users.has(socketId)) {
            UserConnectionService.users.delete(socketId)

            return { status: Status.SUCCESS, message: "User delete" }
        }
        else {
            console.log("User is not connected, cannot be deleted")
            return { status: Status.ERROR, message: "User is not connected, cannot be deleted" }
        }
    }
}