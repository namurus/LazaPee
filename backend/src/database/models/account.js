'use strict';
const { Model } = require('sequelize');
import { compare, hash } from 'bcrypt';
import * as helpers from '@/helpers/token';
module.exports = (sequelize, DataTypes) => {
	class Account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
	Account.init(
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
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'username',
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'password',
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'role_id'
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
			modelName: 'Account',
			tableName: "account",
			paranoid: true,
		}
	);
	Account.addHook('beforeSave', async (instance) => {
		if (instance.changed('password')) {
			instance.password = await hash(instance.password, 10);
		}
	});
	return Account;
};
