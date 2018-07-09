import { assert } from 'chai';

import * as server from '../index';

describe('application', () => {

    it('should boot the app', (done) => {
        server.boot(() => {
            assert(true);
            done();
        });
    });

    it('should stop the app', (done) => {
        server.shutdown(() => {
            assert(true);
            done();
        });
    })
});