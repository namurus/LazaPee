import { Sequelize, DataTypes } from 'sequelize';
import userModel from "./models/user";
import categoryModel from './models/category';
import accountModel from './models/account';

import * as config from '@/config/sequelize';
// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);
const modelDefiners = [
	// ....
	//Add models
	userModel,
	categoryModel,
	accountModel
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize, DataTypes);
}

Object.keys(sequelize.models).forEach((modelName) => {
	if (sequelize.models[modelName].associate) {
		sequelize.models[modelName].associate(sequelize.models);
	}
});
export default sequelize;
