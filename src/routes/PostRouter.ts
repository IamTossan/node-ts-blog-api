import { Router, Request, Response } from 'express';

import PostModel from '../models/post';

class PostRouter {
    
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getPosts(req: Request, res: Response) {
        PostModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getPost(req: Request, res: Response) {
        PostModel.findOne({
            slug: req.params.slug,
        })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    }

    createPost(req: Request, res: Response) {
        const post = new PostModel({
            ...req.body,
        });

        post.save()
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                res.status(500).json({err});
            });
    }

    updatePost(req: Request, res: Response) {
        PostModel.findOneAndUpdate({ slug: req.body.slug }, req.body)
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                res.status(500).json({err});
            });
    }

    deletePost(req: Request, res: Response) {
        PostModel.findOneAndRemove({ slug: req.body.slug })
            .then((data) => {
                res.status(204).end();
            })
            .catch((err) => {
                res.status(500).json({err});
            });
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:slug', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:slug', this.updatePost);
        this.router.delete('/:slug', this.deletePost);
    }
}

export default new PostRouter().router;