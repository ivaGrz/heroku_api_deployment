const express = require('express');
const cors = require('cors');

const { upload, uploaded } = require('./utility/upload');
const { unzip } = require('./utility/unzip');
const { createTar } = require('./utility/create-tar');
const { createApp } = require('./utility/createApp');
const { buildApp } = require('./utility/build');
const { createClearDB } = require('./utility/createClearDB');

const app = express();
app.use(cors());

const port = 3000;

app.post('/deployApp', upload.single('file'), async (req, res) => {
	try {
		const app = req.query.app;
		const token = req.query.token;
		console.log('Uploading . . .');
		let fileName = await uploaded(req, res);
		await unzip(fileName);
		fileName = fileName.split('.')[0];
		await createTar(fileName);
		await createApp(app, token);
		const appUrl = await buildApp(fileName, app, token);
		res.send(appUrl);
	} catch (err) {
		console.log(err);
	}
});

app.post('/createClearDB/:appName', async (req, res) => {
	const app = req.params.appName;
	const dbConfig = await createClearDB(app);
	console.log(dbConfig);
	res.send(dbConfig);
});

// ******************************************************

app.post('/upload', upload.single('file'), uploaded);

app.post('/unzip/:fileName', (req, res) => {
	unzip(req.params.fileName);
	res.send('File unziped!');
});

app.post('/create-tar/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	createTar(fileName);
	res.send('Tarball created');
});

app.post('/build', (req, res) => {
	const file = req.query.fileName;
	const app = req.query.appName;
	buildApp(file, app);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
