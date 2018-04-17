import * as httpMocks from 'node-mocks-http';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

import { verifyToken } from './auth';


describe('authService', () => {
    it('should resolve when proper jwt', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req.headers = {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaGVsbG8iLCJpYXQiOjE1MjIzNTU5ODh9.GXXZFhiA8xfFEFmAnTRro8z9BSIbX24uFOvemXAYLBM',
        };

        return verifyToken(req, res).should.be.fulfilled;
    });

    it('should reject with code 401 when not proper jwt', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req.headers = {
            authorization: 'Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaGVsbG8iLCJpYXQiOjE1MjIzNTU5ODh9.GXXZFhiA8xfFEFmAnTRro8z9BSIbX24uFOvemXAYLBM',
        };

        return verifyToken(req, res).should.be.rejected.and.become(401);
    });

    it('should reject with code 403 when no jwt', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        return verifyToken(req, res).should.be.rejected.and.become(403);
    });
});