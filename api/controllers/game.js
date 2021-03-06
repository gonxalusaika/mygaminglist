var Game = require('../models').Game;
var api = require('../services/GamesDbScrapper');
var authorization = require('../services/Authentication');

createGame = function(apiGame){
	console.log(apiGame);
	Game.create({
		name: apiGame.GameTitle[0],
		apiId: apiGame.id[0],
		cover: 'http://thegamesdb.net/banners/clearlogo/' + apiGame.id[0] + '.png'
	});
}

module.exports = function(app){

	//Returns all games that match :name querying thegamesdb api
	app.get('/games/extra/:name', function(req, res){
		api.gameList(req.params.name)
			.then((result) => {
				res.json(result);
				result.Data.Game.forEach((apiGame) => {
					createGame(apiGame);
				});
			})
			.catch((reason) => {
				console.log(reason);
				res.json({error: "Error getting info from external api"}).status(500);
			});
	});

	app.post('/games', function(req, res){
		Game.create(req.body)
			.then((result) => {
				res.json(result);
			})
			.catch((reason) => {
				console.log(reason);
				res.json(reason);
			});
	});

	//Returns all games or filtered by 'name' param if specified
	app.get('/games', function(req, res){
		var name = req.query.name;
		var filter = name ? {name: {$like: '%' + name + '%'}} : {};
		Game.findAll({
			attributes: ['id', 'name', 'cover'],
			where: filter
		}).then((gameList) => {
			res.json(gameList);
		})
		.catch((reason) => {
			console.log(reason);
			res.json(reason).status(500);
		});
	});

	app.get('/games/recent', function(req, res){
		Game.findAll({
			attributes: ['id', 'name', 'cover'],
			order: 'updatedAt DESC',
			limit: 10
		}).then((games) => {
			res.json(games);
		});
	});
}