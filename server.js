import express from 'express';
import ip      from 'ip';

let app  = express();
let port = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`Motivaationarsu running at http://${ip.address()}:${port}`);
});

