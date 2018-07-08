import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as superagent from 'superagent';

import * as server from '../../index';

chai.should();
chai.use(chaiAsPromised);

import { UserRouter } from './UserRouter';

const instance = new UserRouter();

describe('UserRouter', () => {

    beforeEach((done) => {
        server.boot(() => {
            done();
        });
    });

    afterEach((done) => {
        server.shutdown(() => {
            done();
        });
    });

    it('should be ok', () => {
        return instance.getUsers().should.be.fulfilled;
    });

    it('should create a new user', (done) => {
        superagent.post('localhost:3000/api/user')
            .send({
                name: 'testname',
                username: 'testusername',
                email: 'testemail@test.com',
                password: 'testpassword',
            })
            .then((res) => {
                chai.assert(res.status === 201);
                done()
            });
    });
});