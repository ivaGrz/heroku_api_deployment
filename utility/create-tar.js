const tar = require('tar');

const createTar = async fileName => {
	console.log('Creating tarball . . .');
	await tar.c(
		{
			file: `./apps/${fileName}.tgz`
		},
		[`./apps/${fileName}`]
	);
	console.log('Tarball created');
};

module.exports = { createTar };
