'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class reviews extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			reviews.belongsTo(models.user, {
				foreignKey: 'userId',
				as: 'user',
			});
			reviews.belongsTo(models.product, {
				foreignKey: 'productId',
				as: 'product',
			});
		}
	}
	reviews.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'user',
					key: 'id',
				},
			},
			productId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
			},
			rating: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			review: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			deletedAt: {
				allowNull: true,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: 'Review',
			tableName: 'reviews',
			paranoid: true,
		}
	);
	return reviews;
};
