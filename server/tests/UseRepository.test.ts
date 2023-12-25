import { beforeEach, describe, expect, test } from "bun:test";
import { Status } from "../src/types/Type";
import { db } from "../database/SqLite";
import User from "../src/models/User";
import UserRepository from "../src/repositories/UserRepository";

describe("UserRepository", () => {
    let userRepository: UserRepository;
    let user: User;

    beforeEach(() => {
        userRepository = new UserRepository(db);
        user = {
            id: "1",
            name: "testUser",
            tempSocketId: "1"
        };
    });

    test("register a new user", async () => {
        const response = await userRepository.register(user);
        expect(response.status).toBe(Status.SUCCESS);
    });
    test("register a new user with an existing id", async () => {
        const response = await userRepository.register(user);
        expect(response.status).toBe(Status.ERROR);
    }
    );

    test("find user by id", async () => {
        const response = await userRepository.findUserById(user.id);
        expect(response).toEqual(user);
    });

    
});