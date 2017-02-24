var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
// var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// var config = {
//   database: 'prueba',
//   username: 'sa',
//   password: 'sa',
//   host: 'localhost',
//   dialect: 'mssql',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// }

var config = {
  database: 'database',
  username: 'username',
  password: 'password',
  dialect: 'sqlite',
  storage: './db.development.sqlite'
}

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;