'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.hasMany(models.CartItem, {
				foreignKey: 'productId',
				as: 'cartItems',
			});
			Product.belongsTo(models.Category, {
				foreignKey: 'categoryId',
				as: 'category',
			});
			Product.hasMany(models.ProductImage, {
				foreignKey: 'productId',
				as: 'images',
			});
			Product.hasMany(models.Skus, {
				foreignKey: 'productId',
				as: 'skus',
			});
			Product.belongsTo(models.Shop, {
				foreignKey: 'shopId',
				as: 'shop',
			});
		}
	}

	Product.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			productName: {
				type: DataTypes.TEXT,
				allowNull: false,
				field: 'productName',
			},
			shopId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'shops',
					key: 'shop_id',
				},
				field: 'shop_id',
			},
			brand: {
				type: DataTypes.STRING,
				field: 'brand',
			},
			thumbnail: {
				type: DataTypes.STRING,
				field: 'thumbnail',
			},
			description: {
				type: DataTypes.TEXT,
				field: 'description',
			},
			slug: {
				type: DataTypes.STRING,
				field: 'slug',
			},
			categoryId: {
				type: DataTypes.INTEGER,
				field: 'category_id',
			},
			status: {
				type: DataTypes.ENUM('available', 'out of stock'),
				field: 'status',
			},
			soldQuantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			deletedAt: {
				allowNull: true,
				type: DataTypes.DATE,
				field: 'deleted_at',
			},
		},
		{
			sequelize,
			paranoid: true,
			modelName: 'Product',
			tableName: 'product',
		}
	);
	Product.addHook('beforeSave', async (instance) => {
		instance.slug = instance.productName.toLowerCase().replace(/\s+/g, '-');
	});
	return Product;
};
