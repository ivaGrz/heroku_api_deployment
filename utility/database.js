// https://devcenter.heroku.com/articles/platform-api-reference#add-on

const Heroku = require('heroku-client');
const heroku = new Heroku({ token: '7948305b-26ae-4a95-ba05-a06c2989b421' });

// ************************
// ***** CREATE ADDON *****
// ************************
// heroku.post('/apps/example85/addons', {
// 	body: {
// 		plan: 'cleardb:ignite'
// 	}
// });

// ****************************
// ***** GET ADDON CONFIG *****
// ****************************
heroku
	.get('/addons/cleardb-clean-72624/config')
	.then(res => {
		const value = res[0].value;
		const configData = value.split(/[/:@?]+/);
		configData.pop();
		const [dialect, username, password, host, database] = configData;
		console.log(configData);
		return configData;
	})
	.catch(err => console.log(err));

// heroku
// 	.get('/addons')
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(err => console.log(err));
