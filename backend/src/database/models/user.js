'use strict';
const { Model } = require('sequelize');
import { compare, hash } from 'bcrypt';
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasOne(models.Cart, {
				foreignKey: 'userId',
				as: 'cart',
			});
			
		}
		validatePassword(plainPassword) {
			return compare(plainPassword, this.password);
		}
	}

	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			fullName: {
				type: DataTypes.STRING,
				field: 'full_name',
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				field: 'email',
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'password',
			},
			avatar: {
				type: DataTypes.STRING,
				field: 'avatar',
			},
			address: {
				type: DataTypes.STRING,
				field: 'address',
			},
			role: {
				type: DataTypes.STRING,
				field: 'role',
				defaultValue: 'customer',
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'created_at',
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
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
			modelName: 'User',
			tableName: 'user',
		}
	);
	User.addHook('beforeSave', async (instance) => {
		if (instance.changed('password')) {
			instance.password = await hash(instance.password, 10);
		}
	});
	return User;
};
