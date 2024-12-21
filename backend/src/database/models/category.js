'use strict';
const { Model } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Category.hasMany(models.Category, {
				foreignKey: 'parentId',
				as: 'subCategories', 
			});
			Category.belongsTo(models.Category, {
				foreignKey: 'parentId',
				as: 'parentCategory',
			});
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
				unique: true,
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
			hooks: {
				// create a slug before saving the record (for both create and update)
				beforeSave: async (category) => {
					// Only generate a slug if the 'name' field has been changed
					if (category.changed('name')) {
						category.slug = await createUniqueSlug(category.name);
					}
				},
			},
		}
	);
	
	// Function to create a unique slug for a category
	async function createUniqueSlug(name) {
		let slug = slugify(name, { lower: true, strict: true });
		let uniqueSlug = slug;

		// Check if a category with the same slug already exists in the database
		let existingCategory = await Category.findOne({ where: { slug: uniqueSlug } });
		let count = 1;

		// If a conflict is found, append a suffix to make the slug unique
		while (existingCategory) {
			uniqueSlug = `${slug}-${count}`;
			existingCategory = await Category.findOne({ where: { slug: uniqueSlug } });
			count++;
		}

		return uniqueSlug;
	}

	return Category;
};