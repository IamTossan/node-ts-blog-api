import * as chai from 'chai';
import * as superagent from 'superagent';

import UserModel from '../../models/user';

describe('UserRouter', () => {

    it('should create a new user', (done) => {
        const testUser = {
            name: 'testname',
            username: 'testusername',
            email: 'testemail@test.com',
            password: 'testpassword',
        };
        superagent.post('localhost:3000/api/user')
            .send(testUser)
            .then((res) => {
                chai.assert(res.status === 201);
                UserModel.findOne({ email: testUser.email })
                    .then((data: any) => {
                        chai.assert(data.name === testUser.name);
                        chai.assert(data.username === testUser.username);
                        chai.assert(data.email === testUser.email);
                        chai.assert(data.password);
                        done()
                    });
            });
    });

    it('should get the user list', (done) => {
        superagent.get('localhost:3000/api/user')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaGVsbG8iLCJpYXQiOjE1MjIzNTU5ODh9.GXXZFhiA8xfFEFmAnTRro8z9BSIbX24uFOvemXAYLBM')
            .then((res) => {
                const data = res.body.data;
                chai.assert(Array.isArray(data));
                chai.assert(data.length);
                done();
            });
    });
});