const fs = require('fs-extra');
const path = require('path');

const cleaner = folder => {
	console.log('Starting cleaning ' + folder);
	try {
		fs.readdir(folder, (err, files) => {
			if (err) throw err;
			for (const file of files) {
				console.log(`Deleting ${file} . . .`);
				fs.removeSync(path.join(folder, file));
			}
			console.log(`Folder ${folder} is empty.`);
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { cleaner };
