const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello service 1');
});

app.listen(port, () => {
    console.log(`Service 1 listening at http://localhost:${port}`);
});
