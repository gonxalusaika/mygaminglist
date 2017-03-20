var authentication = require('../../api/services/Authentication');

var user = {
	username: 'Pepe',
	id: 5
}

var token = authentication.generateToken(user);