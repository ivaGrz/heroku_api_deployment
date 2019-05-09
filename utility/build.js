const Heroku = require('heroku-client');
const heroku = new Heroku({ token: '7948305b-26ae-4a95-ba05-a06c2989b421' });

var request = require('request-promise');
var fs = require('fs');

async function buildApp(file, app) {
	let putUrl;
	let getUrl;

	console.log('Starting building the app . . .');
	console.log('. . . . . . . . . .');
	console.log('Getting source URL . . .');

	await heroku
		.post(`/apps/${app}/sources`)
		.then(res => {
			putUrl = res.source_blob.put_url;
			getUrl = res.source_blob.get_url;
			console.log(res);
		})
		.catch(err => console.log(err));

	const buffer = await fs.readFileSync(`./apps/${file}.tgz`);
	// console.log(buffer);

	console.log('. . . . . . . . . .');
	console.log('Uploading data . . .');

	await request(
		{
			url: putUrl,
			method: 'PUT',
			body: buffer,
			headers: {
				'Content-Type': ''
			}
		},
		(err, res) => {
			if (err) {
				return console.log(err);
			}
			console.log('Data uploaded!');
		}
	);

	console.log('. . . . . . . . . .');
	console.log(`Building app ${app} . . .`);

	await heroku
		.post(`/apps/${app}/builds`, {
			body: {
				source_blob: {
					url: getUrl
					// ,
					// version: req.body.version,
					// version_description: req.body.description
				}
			}
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => console.log(err));

	await heroku.get(`/apps/${app}`).then(res => {
		console.log('. . . . . . . . . .');
		console.log(`Application deployed!`);
		console.log('. . . . . . . . . .');
		console.log(res.web_url);
		console.log('. . . . . . . . . .');
	});
}

module.exports = { buildApp };
