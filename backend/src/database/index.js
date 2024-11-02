import { Sequelize, DataTypes } from 'sequelize';
import userModel from "./models/user";
import productModel from "./models/product";
import cartItemModel from "./models/cart_item";
import cartModel from "./models/cart";

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
	productModel,
	cartItemModel,
	cartModel
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
