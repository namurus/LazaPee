'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PostOffice extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
	}

	PostOffice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			officeName: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'officeName',
			},
			officeAddress: {
				type: DataTypes.TEXT,
				allowNull: false,
				field: 'officeAddress',
			},
			shipUnit: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'shipUnit',
			},
			shipCost: {
				// per km
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				field: 'shipCost',
			},
		},
		{
			sequelize,
			modelName: 'PostOffice',
			tableName: 'post_office',
			timestamps: false,
		}
	);
	return PostOffice;
};
