const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'upload');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

const uploaded = (req, res) => {
	const name = req.file.originalname;
	const extension = getExtension(name);
	if (extension !== 'zip') {
		throw {
			body: {
				message: 'Invalid file type. Please select a .zip file.'
			}
		};
	}
	console.log('. . . . . . . . . .');
	console.log(`File ${req.file.originalname} uploaded!`);
	return req.file.originalname;
};

const getExtension = filename => {
	const parts = filename.split('.');
	return parts[parts.length - 1];
};

module.exports = { upload, uploaded };
