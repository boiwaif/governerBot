const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	roleID: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
	},
	group: Sequelize.STRING,
});