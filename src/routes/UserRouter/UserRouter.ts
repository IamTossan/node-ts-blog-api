import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { authMiddleware } from '../../services/auth/auth';
import UserModel from '../../models/user';
import { Document } from 'mongoose';

export class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            UserModel.find({})
                .then((data: Document[]) => {
                    const users = data.map((item: any) => {
                        return {
                            id: item.id,
                            email: item.email,
                            username: item.username,
                            name: item.name,
                        };
                    });
                    resolve(users);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getUsersHandler(req: Request, res: Response) {
        this.getUsers()
            .then((data) => {
                res.json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    getUser(req: Request, res: Response) {
        UserModel.findOne({ username: req.params.username })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    createUser(req: Request, res: Response) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                throw err;
            }
            const user = new UserModel({
                ...req.body,
                password: hash,
            });

            user.save()
                .then((data) => {
                    res.status(201).json({ data });
                })
                .catch((err) => {
                    res.status(500).json({ err });
                });
        })
    }

    updateUser(req: Request, res: Response) {
        UserModel.findOneAndUpdate({
            username: req.params.username,
        }, {
            ...req.body,
        })
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    deleteUser(req: Request, res: Response) {
        UserModel.findOneAndRemove({ username: req.params.username })
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    routes() {
        this.router.get('/', authMiddleware, this.getUsersHandler.bind(this));
        this.router.get('/:username', authMiddleware, this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', authMiddleware, this.updateUser);
        this.router.delete('/:username', authMiddleware, this.deleteUser);
    }
}

export default new UserRouter().router;