import User from "../models/User";


export default class HashManager {


    static getRandomUserId(): string {
        return crypto.randomUUID().split("-")[0];
    }
    static getRandomNameID(): string {
        const random = crypto.randomUUID().split("-")[0];
        if (random.length > 4) {
            return random.slice(0, 4);
        }
        else {
            return random;
        }

    }
    static async hash(beforeEncryption: string): Promise<string> {
        return await Bun.password.hash(beforeEncryption);
    }

    static async compareHash(beforeEncryption: string, afterEncryption: string): Promise<boolean> {
        return await Bun.password.verify(beforeEncryption, afterEncryption);
    }

    static async findUserByHashId(id: string, users: User[]): Promise<User | null> {
        for (const user of users) {

            if (await HashManager.compareHash(id, user.id)) {

                return user;
            }
        }
        return null;
    }



}