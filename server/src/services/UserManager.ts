import User from "../models/User";
import { ResponseStatus, UserId } from "../types/Type";
import { Status } from "../types/Type";
export default class UserManager {
    static users = new Map<UserId, User>();
    public connectUser(user: User): ResponseStatus {
        if (UserManager.users.has(user.id)) {
            return { status: Status.ERROR, message: "User already connected" }
        }
        else {
            UserManager.users.set(user.id, user)
            return { status: Status.SUCCESS, message: "User added" }
        }
    }

    public disconnectUser(user: User) {
        if (UserManager.users.has(user.id)) {
            UserManager.users.delete(user.id)
            return { status: Status.SUCCESS, message: "User delete" }
        }
        else {
            return { status: Status.ERROR, message: "User is not connected, cannot be deleted" }
        }
    }
}