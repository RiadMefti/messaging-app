import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import userRouter from './controllers/user-controller/UserController';
import SocketHandlerConfigurator from './socketHandlers/SocketHandler';

class App {
    private app: express.Express;
    private server: http.Server;
    private io: Server;
    private socketConfigurator: SocketHandlerConfigurator;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        // Initialize socket handlers
        // Initialize socket handlers
        this.socketConfigurator = SocketHandlerConfigurator.getInstance(this.io);

        // Initialize middlewares

        this.initRoutes();


    }
    private initRoutes(): void {
        //Routes


        this.app.use('/user', userRouter);
    }
    public listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`listening on ${port}`);
        });
    }
}

// Usage
const app = new App();
app.listen(3000);