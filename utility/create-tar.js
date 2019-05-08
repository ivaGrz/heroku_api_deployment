const tar = require('tar');

const createTar = async (req, res) => {
	console.log('Creating tarball ...');
	const fileName = req.params.fileName;
	await tar.c(
		{
			file: `./apps/${fileName}.tgz`
		},
		[`./apps/${fileName}`]
	);
	console.log('Tarball created');
	res.send('Tarball created');
};

module.exports = { createTar };
