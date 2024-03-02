const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello service 2');
});S

app.listen(port, () => {
    console.log(`Service 1 listening at http://localhost:${port}`);
});
