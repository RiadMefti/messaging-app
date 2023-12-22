import { Server } from "socket.io";
import SocketUserHandler from "./userHandler/SocketUserHandler";

export default class SocketHandlerConfigurator {
    private io: Server;
    static userHandler: SocketUserHandler;



    constructor(io: Server) {
        this.io = io;
        this.initSocketHandler();
    }
    initSocketHandler() {
        SocketHandlerConfigurator.userHandler = new SocketUserHandler(this.io);
       
    }
}