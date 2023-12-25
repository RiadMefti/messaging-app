import { Server } from "socket.io";
import SocketUserHandler from "./userHandler/SocketUserHandler";
import UserManager from "../services/UserManager";
import UserRepository from "../repositories/UserRepository";
import { db } from '../../database/SqLite';
export default class SocketHandlerConfigurator {
    private io: Server;
    static userHandler: SocketUserHandler;



    constructor(io: Server) {
        this.io = io;
        this.initSocketHandler();
    }
    initSocketHandler() {
        SocketHandlerConfigurator.userHandler = new SocketUserHandler(this.io, new UserManager(new UserRepository(db)));

    }
}