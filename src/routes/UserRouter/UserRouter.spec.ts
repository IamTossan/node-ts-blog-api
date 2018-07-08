import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

import { UserRouter } from './UserRouter';

const instance = new UserRouter();

describe('UserRouter', () => {
    it('should be ok', () => {
        return instance.getUsers().should.be.fulfilled;
    });
});