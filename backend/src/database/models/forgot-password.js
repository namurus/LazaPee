'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ForgotPassword extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ForgotPassword.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			otp: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			expiredAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			resetToken: {
				type: DataTypes.STRING,
				allowNull: true
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
			modelName: 'ForgotPassword',
			tableName: 'forgot-passwords',
		}
	);
	return ForgotPassword;
};
