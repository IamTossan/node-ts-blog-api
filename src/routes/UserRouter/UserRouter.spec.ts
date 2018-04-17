import * as httpMocks from 'node-mocks-http';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
const mockgoose = new Mockgoose(mongoose);

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

import { UserRouter } from './UserRouter';

const instance = new UserRouter();

describe('UserRouter', () => {
    it('should be ok', () => {
        return instance.getUsers().should.be.fulfilled;
    });
});