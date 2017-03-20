var scrapper = require('../../api/services/GamesDbScrapper');

scrapper.gameList('Doom')
	.then(function(result){
		result.Data.Game.forEach(function(game){
			console.log(game);
		});
	})
	.catch(function(error){
		console.log("There was an error:", error);
	});