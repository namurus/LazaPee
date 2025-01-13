'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'permissions',
			[
				{
					name: 'Chỉnh sửa người dùng',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Quản lý mã giảm giá',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Quản lý sản phẩm',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Quản lý đơn hàng',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		*/
		await queryInterface.bulkDelete('permissions', null, {});
	},
};
