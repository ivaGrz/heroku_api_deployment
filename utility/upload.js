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
	console.log(`File ${req.file.originalname} uploaded!`);
	console.log(req.file);
	res.send(`File ${req.file.originalname} uploaded!`);
};

module.exports = { upload, uploaded };
