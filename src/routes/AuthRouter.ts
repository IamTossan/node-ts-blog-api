import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';

class AuthRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    login(req: Request, res: Response) {
        User.findOne({ email: req.body.email })
            .then((user: any) => {
                if (!user) {
                    res.sendStatus(400);
                    return;
                }
                bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                    if (err) {
                        throw err;
                    }
                    if (!isValid) {
                        res.sendStatus(400);
                        return;
                    }
                    jwt.sign({
                        data: 'hello',
                    },
                    'secretkey',
                    (err, token) => {
                        res.json({token: `Bearer ${token}`});
                    });

                })
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    routes() {
        this.router.post('/login', this.login);
    }
}

export default new AuthRouter().router;