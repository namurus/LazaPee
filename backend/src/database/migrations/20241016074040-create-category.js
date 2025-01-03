'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('category', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				field: 'id',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'name',
			},
			parentId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				field: 'parent_id',
				references: {
					model: 'category',
					key: 'id',       
				},
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'slug',
			},
			thumbnail: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'thumbnail',
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
				onDelete: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('category');
	},
};