import * as chai from 'chai';
import * as superagent from 'superagent';

describe('AuthRouter', () => {
    it('should return a token', (done) => {
        const payload = {
            email: 'test@test.co',
            password: '123',
        };

        superagent.post('localhost:3000/api/auth/login')
            .send(payload)
            .then((res) => {
                chai.assert(res.status === 200);
                chai.assert(res.body.token);
                done()
            });
    });

    it('should return an unauthorized status code', (done) => {
        const payload = {
            email: 'test@test.co',
            password: '1234',
        };

        superagent.post('localhost:3000/api/auth/login')
            .send(payload)
            .on('error', (res) => {
                chai.assert(res.status === 400);
            })
            .catch((err) => {
                done();
            });
    });
});