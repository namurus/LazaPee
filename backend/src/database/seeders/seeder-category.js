'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'category',
			[
				{
					name: "Laptop",
					description: "Laptop",
					thumbnail: "https://via.placeholder.com/150",
				},
				{
					name: "Smartphone",
					description: "Smartphone",
					thumbnail: "https://via.placeholder.com/150",
				}
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
