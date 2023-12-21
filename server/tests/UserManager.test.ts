import { beforeEach, describe, expect, test } from "bun:test";
import UserManager from "../src/services/UserManager";
import { Status } from "../src/types/Type";

describe("UserManager", () => {
    let userManager: UserManager;
    beforeEach(() => {
        userManager = new UserManager();

    })
    test("disconnecting a user when he is not there should error", () => {
        const response = userManager.disconnectUser({ id: "1", name: "toto", tempSocketId: "1" });
        expect(response.status).toBe(Status.ERROR);
    });
    test("connecting a user when he is already there should error", () => {
        userManager.connectUser({ id: "1", name: "toto", tempSocketId: "1" });
        const secondResponse = userManager.connectUser({ id: "1", name: "toto", tempSocketId: "1" });
        expect(secondResponse.status).toBe(Status.ERROR);
    });
    test("connecting a user when he is not there should success", () => {
        const response = userManager.connectUser({ id: "1", name: "toto", tempSocketId: "1" });
        expect(response.status).toBe(Status.ERROR);
    });
    test("disconnecting a user when he is already there should success", () => {
        userManager.connectUser({ id: "1", name: "toto", tempSocketId: "1" });
        const secondResponse = userManager.disconnectUser({ id: "1", name: "toto", tempSocketId: "1" });
        expect(secondResponse.status).toBe(Status.SUCCESS);
    });

});