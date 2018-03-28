import * as http from 'http';

import Server from './server';

const port = process.env.PORT || 3000;
Server.set('port', port);

const server = http.createServer(Server);

const boot = () => {
    server.listen(Server.get('port'));
};

const shutdown = () => {
    server.close();
};

server.on('listening', () => {
    console.log(`server is listening on port ${Server.get('port')}`);
});

if (require.main === module) {
    boot();
} else {
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = Server.get('port');
}