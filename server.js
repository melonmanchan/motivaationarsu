import express from 'express';
import http    from 'http';
import ip      from 'ip';
import sockets from 'socket.io';

let app    = express();
let server = http.Server(app);
let io     = sockets(server);

let port = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/public`));

io.on('connection', socket => {
    console.log('New socket connected');
});

server.listen(port, () => {
    console.log(`Motivaationarsu running at http://${ip.address()}:${port}`);
});

