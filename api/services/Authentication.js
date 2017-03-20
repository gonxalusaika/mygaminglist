var jwt = require('jsonwebtoken');
var User = require('../models').User;
var config = require('../../config');

module.exports = {
	isAuthenticated: (req, res, next) => {
		if(!req.headers.authorization){
			return res.status(401).json({error: 'User not logged in'}).end();
		}

		var token = req.headers.authorization.split(' ')[1]; //Remove Bearer

		jwt.verify(token, config.jwtSecret, (err, decoded) => {
		    if (err) {
		    	return res.status(401).json({error: 'User not logged in'}).end();
		    }

		    User.findById(decoded.id)
		    	.then((user) => {
		    		if(!user){
		    			return res.status(401).json({error: 'User not logged in'}).end();
		    		}
		    		else{
		    			req.loggedUser = user;
		    			return next();
		    		}
		    	})
		    	.catch((err) => {
		    		return res.status(401).json({error: 'Error validating logged user'}).end();
		    	});
		    });
	},
	generateToken: (user) => {
		var payload = {
			username: user.username,
			id: user.id
		}
		var token = jwt.sign(payload, config.jwtSecret);
		return token;
	}
}