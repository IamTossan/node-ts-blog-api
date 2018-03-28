import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import PostRouter from './routes/PostRouter';
import UserRouter from './routes/UserRouter';

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('server is connected to mongodb');
            })
            .catch((err) => {
                console.error('could not connect to mongodb', err);
            });


        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/user', UserRouter);
        this.app.use('/post', PostRouter);
    }
}

export default new Server().app;