module.exports = function(sequelize, DataTypes){
	var Game = sequelize.define("Game", {
		name: DataTypes.STRING,
		apiId: DataTypes.INTEGER,
		cover: DataTypes.STRING
	},
	{
		classMethods:{
			associate: function(models){
				Game.belongsToMany(models.User, {
					through: models.UserGame,
					foreignKey: 'game_id'
				})
			}
		}
	});

	return Game;
}