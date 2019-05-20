const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		if (!fs.existsSync('upload')) {
			fs.mkdirSync('upload');
		}
		cb(null, 'upload');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

const uploaded = (name, type) => {
	const extension = getExtension(name);
	if (extension !== type) {
		throw {
			body: {
				message: `Invalid file type. Please select a .${type} file.`
			}
		};
	}
	console.log('Uploaded!');
};

const getExtension = filename => {
	const parts = filename.split('.');
	return parts[parts.length - 1];
};

module.exports = { upload, uploaded };
