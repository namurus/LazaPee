'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Category.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
				field: 'id',
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'name',
			},
			parentId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'parent_id',
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: true,
				field: 'slug',
			},

			thumbnail: {
				type: DataTypes.STRING,
				allowNull: true,
				field: 'thumbnail',
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
			modelName: 'Category',
			tableName: 'category',
		}
	);
	return Category;
};