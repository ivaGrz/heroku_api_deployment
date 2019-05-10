// https://devcenter.heroku.com/articles/platform-api-reference#add-on

const Heroku = require('heroku-client');
const { token } = require('../keys/heroku');

const heroku = new Heroku({ token: token });

const createClearDB = async appName => {
	// ***** CREATE ADDON *****
	let dbName;
	await heroku
		.post(`/apps/${appName}/addons`, {
			body: {
				plan: 'cleardb:ignite'
			}
		})
		.then(res => {
			// console.log(res);
			dbName = res.name;
		})
		.catch(err => console.log(err));

	// ***** GET ADDON CONFIG *****
	return await heroku
		.get(`/addons/${dbName}/config`)
		.then(res => {
			const value = res[0].value;
			const configData = value.split(/[/:@?]+/);
			configData.pop();
			const [dialect, username, password, host, database] = configData;
			const dbConfig = {
				dialect,
				username,
				password,
				host,
				database
			};
			return dbConfig;
		})
		.catch(err => console.log(err));
};

module.exports = { createClearDB };
