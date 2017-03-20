var Authentication = require('../services/Authentication');
var Game = require('../models').Game;

module.exports = function(app){
	app.get('/mygames', Authentication.isAuthenticated, function(req, res){
		if(req.loggedUser){
			req.loggedUser.getGames()
				.then((games) => {
					res.json(games.map((game) => {
						return {id: game.id, name: game.name, cover: game.cover};
					}));
				});
		}
	});

	app.post('/mygames', Authentication.isAuthenticated, function(req, res){
		if(req.loggedUser){
			Game.findById(req.body.gameId)
				.then((game) => {
					if(game){
						console.log('Associating game ' + game.id + ' with user ' + req.loggedUser.id);
						req.loggedUser.addGame(game);

						game.changed('updatedAt', true); //workaround to update the date
						game.save();
						res.status(201).json(game);
					}
				});
		}
	});
}