import { Server, Socket } from "socket.io";
import SocketUserHandler from "./userHandler/SocketUserHandler";
import UserManager from "../services/UserManager";
import UserRepository from "../repositories/UserRepository";
import RoomManager from "../services/RoomManager";
import { db } from '../../database/SqLite';
import SocketRoomHandler from "./roomHandler/SocketRoomHandler";
import RoomRepository from "../repositories/RoomRepository";
import SocketMessageHandler from "./messageHandler/SocketMessageHandler";
export default class SocketHandlerConfigurator {
    io: Server;
    static userHandler: SocketUserHandler;
    static roomHandler: SocketRoomHandler;
    static messageHandler: SocketMessageHandler;
    userManager = new UserManager(new UserRepository(db));
    roomManager = new RoomManager(new RoomRepository(db));

    // Private static variable to hold the single instance
    private static instance: SocketHandlerConfigurator;

    private constructor(io: Server) {
        this.io = io;
        this.initSocketHandler();
    }

    // Public static method to get the instance
    public static getInstance(io: Server): SocketHandlerConfigurator {
        if (!SocketHandlerConfigurator.instance) {
            SocketHandlerConfigurator.instance = new SocketHandlerConfigurator(io);
        }
        return SocketHandlerConfigurator.instance;
    }

    initSocketHandler() {
        SocketHandlerConfigurator.userHandler = new SocketUserHandler(this.io, this.userManager);
        SocketHandlerConfigurator.roomHandler = new SocketRoomHandler(this.io, this.roomManager);
        SocketHandlerConfigurator.messageHandler = new SocketMessageHandler(this.io, this.roomManager);
      
    }
}