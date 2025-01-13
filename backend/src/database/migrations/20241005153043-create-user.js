'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullName: {
				type: Sequelize.STRING,
				field: 'full_name',
			},
			email: {
				type: Sequelize.STRING,
				field: 'email',
			},
			username: {
				type: Sequelize.STRING,
				allowNull: 'false',
				unique: true,
				field: 'username',
			},
			password: {
				type: Sequelize.STRING,
				field: 'password',
			},
			avatar: {
				type: Sequelize.STRING,
				field: 'avatar',
			},
			phone: {
				type: Sequelize.STRING,
				field: 'phone',
			},
			address: {
				type: Sequelize.STRING,
				field: 'address',
			},
			role: {
				type: Sequelize.STRING,
				field: 'role',
				defaultValue: 'customer',
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
		await queryInterface.dropTable('user');
	},
};
