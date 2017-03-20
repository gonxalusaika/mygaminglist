module.exports = {
	jwtSecret: 'ASecretForJwt',
	database: {
		development: {
			// database: 'database',
			// username: 'username',
			// password: 'password',
			// dialect: 'sqlite',
			// storage: './db.development.sqlite'
			host: 'localhost',
			dialect: 'mysql',
			username: 'root',
			database: 'prueba'
		}
	}
}