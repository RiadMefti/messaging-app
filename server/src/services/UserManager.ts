import User from "../classes/User";
import UserRepository from "../repositories/UserRepository";
import { UserId } from "../types/Type";
import { NameReturn } from "../types/Type";

import RandomManager from "./SecretManager";
import UserConnectionService from "./UserConnectionService";
export default class UserManager {
  
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

    public async loginUser(socketId: string, id: string): Promise<User | null> {
        const users = await this.userRepository.findUsers();

        if (users) {
            const user = await RandomManager.findUserByHashId(id, users as User[]);
            if(user){
                user.id = id as unknown as UserId;        
                UserConnectionService.connectUser(socketId, user); 
            }
            return user
        }
        return null

    }

   
}