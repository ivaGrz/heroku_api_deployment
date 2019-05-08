const Heroku = require('heroku-client');
const heroku = new Heroku({ token: '7948305b-26ae-4a95-ba05-a06c2989b421' });

createHerokuApp = appName => {
	heroku.post('/apps').then(apps => {
		console.log(apps);
	});
};
