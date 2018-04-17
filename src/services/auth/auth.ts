import * as jwt from 'jsonwebtoken';

export function verifyToken(req, res): Promise<any> {
    return new Promise((resolve, reject) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader === 'undefined') {
            reject(403);
        } else {
            const bearerToken = bearerHeader.split(' ')[1];
            jwt.verify(bearerToken, 'secretkey', (err, decoded) => {
                if (err) {
                    reject(401);
                } else {
                    req.user = decoded;
                    resolve();
                }
            });
        }
    })
}

export function authMiddleware(req, res, next) {
    verifyToken(req, res)
        .then(() => {
            next();
        })
        .catch((err) => {
            res.sendStatus(err);
        });
}