var request = require('request');
var xml2js = require('xml2js');

var url = "http://thegamesdb.net/api/";
var makeRequest = function(method){
	console.log("Making a request to gamesdb api:",method);
	return new Promise(function(resolve, reject){
		request(url + method, function(error, response, body){
			if(error){
				console.log("Error connecting to thegamesdb api:",error);
				reject(body);
			}
			else{
				xml2js.parseString(body, function(err, result){
					if(err){
						console.log("Error parsing result from api:", result);
						reject(err);
					}
					else
						resolve(result);
				});
			}
		});
	});
}

var scrapper = {
	gameList: function(name){
		return makeRequest("GetGamesList.php?name=" + name);
	}
}

module.exports = scrapper;