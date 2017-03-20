module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		name: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING
	},
	{
		classMethods:{
			associate: function(models){
				User.belongsToMany(models.Game, {
					through: models.UserGame,
					foreignKey: 'user_id'
				})
			}
		}
	});

	return User;
}