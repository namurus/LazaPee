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
				type: DataTypes.STRING,
				allowNull: false,
				field: 'productName',
			},
			brand: {
				type: DataTypes.STRING,
				field: 'brand',
			},
			thumbnail: {
				type: DataTypes.STRING,
				field: 'thumbnail',
			},
			image: {
				type: DataTypes.STRING,
				field: 'image',
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				field: 'price',
			},
			stock: {
				type: DataTypes.INTEGER,
				field: 'stock',
				defaultValue: 0,
			},
			description: {
				type: DataTypes.TEXT,
				field: 'description',
			},
			slug: {
				type: DataTypes.STRING,
				field: 'slug',
			},
			discountPercentage: {
				type: DataTypes.INTEGER,
				field: 'discount_percentage',
			},
			categoryId: {
				type: DataTypes.INTEGER,
				field: 'category_id',
			},
			status: {
				type: DataTypes.ENUM('available', 'out of stock'),
				field: 'status',
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

	return Product;
};
