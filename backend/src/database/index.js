const Sequelize = require("sequelize")

const config = require("../config/sequelize.js")
// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);
const modelDefiners = [
	// ....
	//Add models
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize, Sequelize.DataTypes);
}

Object.keys(sequelize.models).forEach((modelName) => {
	if (sequelize.models[modelName].associate) {
		sequelize.models[modelName].associate(sequelize.models);
	}
});
module.exports = sequelize;
