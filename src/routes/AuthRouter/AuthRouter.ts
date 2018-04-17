import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../../models/user';

export class AuthRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    login(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: req.body.email })
                .then((user: any) => {
                    if (!user) {
                        reject({ statusCode: 400 });
                    }
                    bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                        if (err) {
                            throw err;
                        }
                        if (!isValid) {
                            reject({ statusCode: 400 });
                        }
                        jwt.sign({
                            data: 'hello',
                        },
                        'secretkey',
                        (err, token) => {
                            resolve({token: `Bearer ${token}`});
                        });
                    })
                })
                .catch((err) => {
                    reject({ statusCode: 500, error: err });
                });
        });
    }

    loginHandler(req: Request, res: Response) {
        this.login(req, res)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.sendStatus(err.statusCode)
            })
    }

    routes() {
        this.router.post('/login', this.loginHandler.bind(this));
    }
}

export default new AuthRouter().router;