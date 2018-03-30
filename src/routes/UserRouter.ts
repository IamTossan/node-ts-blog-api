import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { verifyToken } from '../services/token';
import UserModel from '../models/user';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getUsers(req, res: Response) {
        UserModel.find({})
            .then((data) => {
                res.status(200).json({ data });
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
        this.router.get('/', verifyToken, this.getUsers);
        this.router.get('/:username', verifyToken, this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', verifyToken, this.updateUser);
        this.router.delete('/:username', verifyToken, this.deleteUser);
    }
}

export default new UserRouter().router;