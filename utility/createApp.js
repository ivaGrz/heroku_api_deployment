const Heroku = require('heroku-client');

createApp = async (appName, token) => {
	const heroku = new Heroku({ token: token });

	let appExists;
	await heroku
		.get(`/apps/${appName}`)
		.then(res => {
			console.log(`${appName} exists!`);
			appExists = true;
		})
		.catch(err => {
			if (err.statusCode === 404) {
				console.log(`${appName} not found!`);
				appExists = false;
			} else {
				throw err;
			}
		});

	if (!appExists) {
		console.log(`Creating app ${appName} . . .`);
		await heroku
			.post(`/apps`, {
				body: {
					name: appName
				}
			})
			.then(res => console.log(res))
			.catch(err => {
				throw err;
			});
	}
};

module.exports = { createApp };
