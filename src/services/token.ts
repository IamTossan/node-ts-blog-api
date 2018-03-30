import * as jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined') {
        res.sendStatus(403);
    } else {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, 'secretkey', (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            }
            req.user = decoded;
            next();
        });
    }
}