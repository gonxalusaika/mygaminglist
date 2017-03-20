var models = require('../../api/models');
var bCrypt = require('bcrypt-nodejs');

console.log(process.argv);
if(!(process.argv[0] && process.argv[1] && process.argv[2])){
	console.log('Arguments in this order are required: username password email');
}
else{
	models.sequelize.sync().then(() => {
		var user = {
			username: process.argv[0],
			password: bCrypt.hashSync(process.argv[1], bCrypt.genSaltSync(10), null),
			email: process.argv[2]
		}
		console.log('Creating user: ' + user);

		User.create(user)
			.then((createdUser) => {
				console.log('User ' + createdUser + ' created successfully');
			})
			.catch((err) => {
				console.log(err);
			})
	});
}