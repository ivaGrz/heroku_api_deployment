const express = require('express');
const cors = require('cors');

const { upload, uploaded } = require('./utility/upload');
const { unzip } = require('./utility/unzip');
const { createTar } = require('./utility/create-tar');
const { createApp } = require('./utility/createApp');
const { buildApp } = require('./utility/build');
const { createClearDB } = require('./utility/createClearDB');
const { dumpSQLFile } = require('./utility/dumpSQLFile');
const { cleaner } = require('./utility/cleaner');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.post('/deployApp', upload.single('file'), async (req, res) => {
	try {
		const app = req.query.app;
		const token = req.query.token;
		console.log('Uploading . . .');
		let fileName = req.file.originalname;
		console.log(fileName);
		uploaded(fileName, 'zip');
		await unzip(fileName);
		fileName = fileName.split('.')[0];
		console.log('Filename: ', fileName);
		await createTar(fileName);
		await createApp(app, token);
		const appUrl = await buildApp(fileName, app, token);
		res.send(appUrl);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

app.post('/createClearDB', async (req, res) => {
	const app = req.query.app;
	const token = req.query.token;
	const dbConfig = await createClearDB(app, token);
	console.log(dbConfig);
	res.send(dbConfig);
});

app.post('/dumpSQLFile', async (req, res) => {
	try {
		const host = req.query.host;
		const user = req.query.user;
		const password = req.query.password;
		const db = req.query.db;
		const file = req.query.file;
		await dumpSQLFile(host, user, password, db, file);
		res.send('Done!');
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

app.post('/upload/:type', upload.single('file'), (req, res) => {
	try {
		const name = req.file.originalname;
		const type = req.params.type;
		console.log(type);
		uploaded(name, type);
		console.log('. . . . . . . . . .');
		console.log(`File ${name} uploaded!`);
		res.send(`File ${name} uploaded!`);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

// ******************************************************

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

app.post('/clean', async (req, res) => {
	await cleaner('upload');
	await cleaner('apps');
	res.send('Done');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
