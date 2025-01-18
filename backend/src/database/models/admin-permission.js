'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class AdminPermission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			AdminPermission.belongsTo(models.User, {
				foreignKey: 'adminId',
				as: 'user',
			});
			AdminPermission.belongsTo(models.Permission, {
				foreignKey: 'permissionId',
				as: 'permission',
			});
		}
	}
	AdminPermission.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},

			adminId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: 'user',
					key: 'id',
				},
			},

			permissionId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: 'permissions',
					key: 'id',
				},
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
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
			tableName: 'admin-permissions',
			modelName: 'AdminPermission',
		}
	);
	return AdminPermission;
};
