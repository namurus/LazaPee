'use strict';
const { Model } = require('sequelize');
import { compare, hash } from 'bcrypt';
import * as helpers from '@/helpers/token';
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
			User.hasMany(models.Order, {
				foreignKey: 'customerId',
				as: 'orders',
			});
			User.hasOne(models.Shop, {
				foreignKey: 'ownerId', 
				as: 'shop',            
			});
			User.hasMany(models.Review, {
				foreignKey: 'userId',
				as: 'reviews',
			});
		}
		validatePassword(plainPassword) {
			return compare(plainPassword, this.password);
		}
		generateToken() {
			const user = {
				id: this.id,
				email: this.email,
				role: this.role,
				avatar: this.avatar,
				fullName: this.fullName,
				address: this.address,
			}
			const token = helpers.generateToken(user);
			return token;
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
			username: {
				type: DataTypes.STRING,
				allowNull: 'false',
				unique: true,
				field: 'username',
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
			phone: {
				type: DataTypes.STRING,
				field: 'phone',
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
