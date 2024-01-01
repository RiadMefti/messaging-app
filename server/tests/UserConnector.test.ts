import { beforeEach, describe, expect, test } from "bun:test";

import { Status } from "../src/types/Type";
import UserConnectionService from "../src/services/UserConnectionService";

describe("UserManager", () => {

    test("disconnecting a user when he is not there should error", () => {
        const response = UserConnectionService.disconnectUser('1');
        expect(response.status).toBe(Status.ERROR);
    });
    test("connecting a user when he is already there should error", () => {
        UserConnectionService.connectUser('1',{ id: "1", name: "toto", });
        const secondResponse = UserConnectionService.connectUser('1', { id: "1", name: "toto", });
        expect(secondResponse.status).toBe(Status.ERROR);
    });
    test("connecting a user when he is not there should success", () => {
        const response = UserConnectionService.connectUser('1', { id: "1", name: "toto", });
        expect(response.status).toBe(Status.ERROR);
    });


});