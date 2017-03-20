module.exports = function(sequelize, DataTypes){
	var UserGame = sequelize.define("UserGame", {
		id : {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			unique: 'wanted_tag'
		},
		game_id: {
			type: DataTypes.INTEGER,
			unique: 'wanted_tag'	
		}
	});

	return UserGame;
}