import * as httpMocks from 'node-mocks-http';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as mongoose from 'mongoose';

chai.should();
chai.use(chaiAsPromised);

import * as bcrypt from 'bcrypt';
import UserModel from '../../models/user';
import { AuthRouter } from './AuthRouter';

const instance = new AuthRouter();

before((done) => {
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

after((done) => {
    mongoose.connection.close(() => {
        // @ts-ignore
        mongoose.models = {};
        // @ts-ignore
        mongoose.modelSchemas = {};
        done();
    });
});

describe('AuthRouter', () => {
    it('should return a token', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        req.body = {
            email: 'test@test.co',
            password: '123',
        };

        return instance.login(req, res).should.be.fulfilled;
    });

    it('should return an unauthorized error', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        req.body = {
            email: 'test@test.co',
            password: '1234',
        };

        return instance.login(req, res).should.be.rejected.and.become({ statusCode: 400 });
    });
});