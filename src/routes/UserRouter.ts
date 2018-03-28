import { Router, Request, Response } from 'express';

import UserModel from '../models/user';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getUsers(req: Request, res: Response) {
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
        const user = new UserModel({
            ...req.body,
        });

        user.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
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
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

export default new UserRouter().router;