import { db as Db, eq, schema } from '../../database/SqLite';
import User from '../models/User';
import { ResponseStatus, Status } from '../types/Type';
import { hash } from '../utils/crypto';
export default class UserRepository {
    private db: typeof Db;

    constructor(db: typeof Db) {
        this.db = db;
    }

    async register(user: User): Promise<ResponseStatus> {
        try {
            await this.db.insert(schema.users).values({
                id: user.id as string,
                name: user.name,
                tempSocketId: user.tempSocketId,
            });
            return { status: Status.SUCCESS, message: "User created" }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return { status: Status.ERROR, message: err.message }
            }
            return { status: Status.ERROR, message: 'An unknown error occurred' }
        }
    }

    async findUserById(id: string): Promise<User | null> {
        try {
            const user = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
            return user[0] as User;
        }
        catch (err: unknown) {
            console.log(err)
            return null;
        }
    }
}