import * as http from 'http';

import Server from './server';

const port = process.env.PORT || 3000;
Server.set('port', port);

const server = http.createServer(Server);


server.listen(Server.get('port'));


server.on('listening', () => {
    console.log(`server is listening on port ${Server.get('port')}`);
});
