const express = require('express');

const { upload, uploaded } = require('./utility/upload');
const { unzip } = require('./utility/unzip');
const { createTar } = require('./utility/create-tar');
const { buildApp } = require('./utility/build');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.post('/upload', upload.single('file'), uploaded);

app.post('/unzip/:fileName', unzip);

app.post('/create-tar/:fileName', createTar);

app.post('/build', buildApp);

app.listen(port, () => console.log(`App listening on port ${port}!`));
