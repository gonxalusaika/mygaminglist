var User = require('../models').User;
var bCrypt = require('bcrypt-nodejs');
var authentication = require('../services/Authentication');

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = function(app){

	//Register a new user {username, email, password}
	app.post('/users/signup', function(req, res){
		User.findOne({username: req.body.username})
			.then((user) => {
				if(user){
					res.json({error: 'Username already exists'}).status(400);
				}
				else{
					var newUser = req.body;
					//Create the newUser
					newUser.password = createHash(newUser.password);
					console.log('Registering user: ' + user);
					User.create(newUser)
						.then((createdUser) => {
							var token = authentication.generateToken(createdUser);
							res.json({token: token});
						});
					
				}
			});
	});

	app.post('/users/login', function(req, res){
		User.findOne({username: req.body.username})
			.then((user) => {
				if(!user){
					res.json({error: 'Username does not exist'}).status(400);
				}
				else{
					var validPass = bCrypt.compareSync(req.body.password, user.password);
					if(!validPass){
						res.json({error: 'Invalid password'}).status(400);
					}
					else{
						var token = authentication.generateToken(user);
						res.json({token: token});
					}
				}
			});
	});

	app.get('/me', authentication.isAuthenticated, function(req, res){
		if(req.loggedUser){
			req.loggedUser.password = undefined;
			res.json(req.loggedUser);
		}
	})
}