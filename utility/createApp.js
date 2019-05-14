const Heroku = require('heroku-client');
// const { token } = require('../keys/heroku');

// const heroku = new Heroku({ token: token });

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
			console.log(`${appName} not found!`);
			appExists = false;
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
			.catch(err => console.log(err));
	}
};

module.exports = { createApp };
