import { beforeEach, describe, expect, it, test } from "bun:test";
import { hash } from "../src/utils/crypto";

describe("hash", () => {

    it("should hash a string", async () => {
        const hashed = await hash("test");
        const isTest = await Bun.password.verify("test", hashed);
        expect(isTest).toBe(true);
    }
    );
    it("should hash a string and give false when not good hash", async () => {
        const hashed = await hash("test");
        const isTest = await Bun.password.verify("tesst", hashed);
        expect(isTest).toBe(false);
    }
    );
}
);