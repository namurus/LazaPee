'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserVoucher extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserVoucher.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
			UserVoucher.belongsTo(models.Voucher, {
				foreignKey: 'voucherId',
				onDelete: 'CASCADE',
			});
		}
	}
	UserVoucher.init(
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
			},
			voucherId: {
				type: DataTypes.INTEGER,
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
			modelName: 'user-voucher',
			tableName: 'UserVoucher',
			paranoid: true,
		}
	);
	return UserVoucher;
};
