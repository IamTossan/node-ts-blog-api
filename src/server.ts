import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { authMiddleware } from './services/auth/auth';

import AuthRouter from './routes/AuthRouter/AuthRouter';
import PostRouter from './routes/PostRouter/PostRouter';
import UserRouter from './routes/UserRouter/UserRouter';

class Server {

    public app: express.Application;

    public jwtKey = process.env.SECRET_KEY || 'test';

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
            .then(() => {
                console.log('server is connected to mongodb');
            })
            .catch((err) => {
                console.error('could not connect to mongodb', err);
            });


        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api/auth', AuthRouter);
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/post', authMiddleware, PostRouter);
    }
}

export default new Server().app;