const unzipper = require('unzipper');
const fs = require('fs');

const unzip = (req, res) => {
	console.log('Unziping file ...');
	const file = req.params.fileName;
	fs.createReadStream(`upload/${file}`)
		.pipe(unzipper.Extract({ path: 'apps' }))
		.on('close', () => {
			console.log('File unziped!');
			res.send('File unziped!');
		});
};

module.exports = { unzip };
