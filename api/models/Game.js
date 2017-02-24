module.exports = function(sequelize, DataTypes){
	var Game = sequelize.define("Game", {
		name: DataTypes.STRING,
		apiId: DataTypes.INTEGER,
		cover: DataTypes.STRING
	});

	return Game;
}