const unzipper = require('unzipper');
const fs = require('fs');

const unzip = async file => {
	console.log('Unziping . . .');
	return new Promise((resolve, reject) => {
		fs.createReadStream(`upload/${file}`)
			.pipe(unzipper.Extract({ path: 'apps' }))
			.on('error', err => {
				console.log(err);
				reject(err);
			})
			.on('finish', () => {
				console.log('. . . . . . . . . .');
				console.log('File unziped!');
				resolve();
			});
	});
};

module.exports = { unzip };
