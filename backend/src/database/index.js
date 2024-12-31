import { Sequelize, DataTypes } from 'sequelize';
import userModel from "./models/user";
import categoryModel from './models/category';
import accountModel from './models/account';
import productModel from "./models/product";
import cartItemModel from "./models/cart_item";
import cartModel from "./models/cart";
import skusModel from './models/skus';
import attributeModel from './models/attribute';

import * as config from '@/config/sequelize';
import productImage from './models/product-image';
import forgotPassword from './models/forgot-password';
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
	accountModel,
	productModel,
	cartItemModel,
	cartModel,
	productImage,
	forgotPassword
	skusModel,
	attributeModel,
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
