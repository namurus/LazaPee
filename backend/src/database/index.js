import { Sequelize, DataTypes } from 'sequelize';
import userModel from "./models/user";
import categoryModel from './models/category';
import accountModel from './models/account';
import productModel from "./models/product";
import cartItemModel from "./models/cart_item";
import cartModel from "./models/cart";
import orderModel from "./models/order";
import orderItemModel from "./models/order_item";
import skusModel from './models/skus';
import postOfficeModel from './models/post_office';

import * as config from '@/config/sequelize';
import productImage from './models/product-image';
import forgotPassword from './models/forgot-password';
import voucherModel from './models/voucher';
import userVoucherModel from './models/user-voucher';
import paymentModel from './models/payment';
import shopModel from './models/shop';
import reviewsModel from './models/reviews';
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
	forgotPassword,
	orderModel,
	orderItemModel,
	paymentModel,
	skusModel,
	postOfficeModel,
	voucherModel,
	userVoucherModel,
	shopModel,
	reviewsModel
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
