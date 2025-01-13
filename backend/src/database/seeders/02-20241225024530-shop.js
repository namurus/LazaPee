'use strict';

const shop = require('../models/shop');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'shops',
			[
				{
					shop_id: 1,
					shop_name: 'Tech Gadget Store',
					owner_id: 4,
					background: 'https://bom.so/uT4a2l',
					status: 'on',
					description: 'Cửa hàng chuyên về các sản phẩm công nghệ.',
					temporary_closure_period: null,
					temporary_closure_reason: null,
					date_closed: null,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					shop_id: 2,
					shop_name: 'Fashion Boutique',
					owner_id: 3,
					background: 'https://bom.so/4Ycvem',
					status: 'on',
					description: 'Thời trang và phụ kiện thời xu hướng nhất trang cho mọi lứa tuổi.',
					temporary_closure_period: null,
					temporary_closure_reason: null,
					date_closed: null,
					created_at: new Date(),
					updated_at: new Date(),
					deleted_at: null,
				},
				{
					shop_id: 3,
					shop_name: 'Thai Dinh Ngan Pet Store',
					owner_id: 5,
					background: 'https://bom.so/HGwslP',
					status: 'on',
					description: 'Mọi thứ bạn cần cho thú cưng của bạn đều có tại cửa hàng của chúng tôi.',
					temporary_closure_period: null,
					temporary_closure_reason: null,
					date_closed: null,
					created_at: new Date(),
					updated_at: new Date(),
					deleted_at: null,
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
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
