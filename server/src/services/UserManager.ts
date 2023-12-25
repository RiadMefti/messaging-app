import User from "../classes/User";
import UserRepository from "../repositories/UserRepository";
import { ResponseStatus, UserId } from "../types/Type";
import { Status, NameReturn } from "../types/Type";

import RandomManager from "./SecretManager";
export default class UserManager {
    static users = new Map<UserId, User>();
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async createUser(name: string): Promise<NameReturn> {
        const id = RandomManager.getRandomNameID();
        const nameId = RandomManager.getRandomNameID();
        const hashedId = await RandomManager.hash(id);

        const user: User = {
            id: hashedId as unknown as UserId,
            name: name + `#${nameId}`,
        }

        const res = this.userRepository.register(user);

        return {
            id: id,
            name: user.name,
        }

    }

    public async loginUser(id: string): Promise<User | null> {
        const users = await this.userRepository.findUsers();

        if (users) {
            const user = await RandomManager.findUserByHashId(id, users as User[]);
            if(user){
                user.id = id as unknown as UserId;         
            }
            return user
        }
        return null

    }

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