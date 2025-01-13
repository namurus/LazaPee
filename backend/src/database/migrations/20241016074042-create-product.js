'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			productName: {
				type: Sequelize.TEXT,
				field: 'productName',
			},
			shopId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'shops',
					key: 'shop_id',
				},
				field: 'shop_id',
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'brand',
			},
			thumbnail: {
				type: Sequelize.STRING,
				field: 'thumbnail',
			},
			description: {
				type: Sequelize.TEXT,
				field: 'description',
			},
			slug: {
				type: Sequelize.STRING,
				field: 'slug',
			},
			categoryId: {
				type: Sequelize.INTEGER,
				field: 'category_id',
				references: {
					model: 'category',
					key: 'id',
				},
			},
			status: {
				type: Sequelize.ENUM('available', 'out of stock','active', 'inactive'),
				field: 'status',
			},
			soldQuantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'created_at',
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'updated_at',
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				field: 'deleted_at',
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product');
	},
};
