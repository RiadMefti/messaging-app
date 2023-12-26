import { Server } from "socket.io";
import SocketUserHandler from "./userHandler/SocketUserHandler";
import UserManager from "../services/UserManager";
import UserRepository from "../repositories/UserRepository";
import RoomManager from "../services/RoomManager";
import { db } from '../../database/SqLite';
import SocketRoomHandler from "./roomHandler/SocketRoomHandler";
import RoomRepository from "../repositories/RoomRepository";
export default class SocketHandlerConfigurator {
    io: Server;
    static userHandler: SocketUserHandler;
    static roomHandler: SocketRoomHandler;
    userManager = new UserManager(new UserRepository(db));
    roomManager = new RoomManager(new RoomRepository(db));



    constructor(io: Server) {
        this.io = io;
        this.initSocketHandler();
    }
    initSocketHandler() {
        SocketHandlerConfigurator.userHandler = new SocketUserHandler(this.io, this.userManager);
        SocketHandlerConfigurator.roomHandler = new SocketRoomHandler(this.io, this.roomManager);



    }
}