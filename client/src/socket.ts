import { io, Socket } from "socket.io-client";

class SingletonSocket {
    private static instance: Socket;

    private constructor() { }

    public static getInstance(): Socket {
        if (!SingletonSocket.instance) {
            SingletonSocket.instance = io("http://localhost:3000");

        }
        return SingletonSocket.instance;
    }
}

export default SingletonSocket.getInstance();