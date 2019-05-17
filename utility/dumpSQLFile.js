const { exec } = require('child_process');
const path = require('path');

const dumpSQLFile = (host, user, password, db_name, file) => {
	const filePath = path.join(__dirname, '..', 'upload', file);
	exec(
		`mysql --host=${host} --user=${user} --password=${password} --reconnect ${db_name} < ${filePath}`,
		(err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				console.log(err);
				return;
			}
			// the *entire* stdout and stderr (buffered)
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		}
	);
};

module.exports = { dumpSQLFile };

// dumpSQLfile(
// 	'us-cdbr-iron-east-02.cleardb.net',
// 	'bfc43360578902',
// 	'3bd17a5c',
// 	'heroku_a4b26c555fc2d92',
// 	'Sample-SQL-File-10-Rows.sql'
// );
