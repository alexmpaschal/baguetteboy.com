const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});