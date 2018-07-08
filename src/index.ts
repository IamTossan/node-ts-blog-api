import * as http from 'http';

import Server from './server';

const port = process.env.PORT || 3000;
Server.set('port', port);

const server = http.createServer(Server);

const boot = (cb = () => {}) => {
    server.listen(Server.get('port'), cb);
};

const shutdown = (cb = () => {}) => {
    server.close(cb);
};

if (require.main === module) {
    boot(() => {
        console.log(`server is listening on port ${Server.get('port')}`);
    });
}

export {
    boot,
    shutdown,
    port,
};
