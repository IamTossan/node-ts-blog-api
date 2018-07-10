import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import * as server from '../index';
import UserModel from '../models/user';

before((done) => {
    server.boot(() => {
        done();
    });
});

after((done) => {
    server.shutdown(() => {
        done();
    });
});

beforeEach((done) => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
        bcrypt.hash('123', 10, (err, hash) => {
            if (err) {
                throw err;
            }
            const user = new UserModel({
                username: 'test',
                email: 'test@test.co',
                name: 'test',
                password: hash,
            });

            user.save()
                .then((data) => {
                    done();
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});

afterEach((done) => {
    UserModel.deleteMany({}, () => {
        mongoose.connection.close(() => {
            done();
        });
    });
});
