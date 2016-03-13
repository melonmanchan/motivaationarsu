import express from 'express';
import http    from 'http';
import ip      from 'ip';

import setupSocketIO from './socketio.js';

let app    = express();
let server = http.Server(app);
let port   = process.env.PORT || 3000;

setupSocketIO(server);

app.use('/', express.static(`${__dirname}/../public`));

server.listen(port, () => {
    console.log(`Motivaationarsu running at http://${ip.address()}:${port}`);
});

