export function hash(beforeEncryption: string): Promise<string> {
    return Bun.password.hash(beforeEncryption);
}
