var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var models = require('./api/models');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('static'));


// dynamically include routes (Controller)
var router = express.Router();
app.use('/api/v1', router);
fs.readdirSync('./api/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      var route = require('./api/controllers/' + file);
      route(router);
  }
});

var port = process.env.PORT || 3000;

models.sequelize.sync().then(function(){
	app.listen(port, function(){
		console.log('Apollo is listening on port ' + port);
	});
});