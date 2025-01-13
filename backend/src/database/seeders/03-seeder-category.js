'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'category',
			[
				{	id: 1, 
					name: "Electronics",
					description: "Electronics products", 
					thumbnail: "https://via.placeholder.com/150",
				},
				{
					id: 2,
					name: "Household appliances",
					description: "Household appliances products",
					thumbnail: "https://via.placeholder.com/150",
				},
				{
					id: 3,
					name: "Toys",
					description: "Toys products",
					thumbnail: "https://via.placeholder.com/150",
				},
				{
					id: 4,
					name: "Clothing",
					description: "Clothing products",
					thumbnail: "https://via.placeholder.com/150",
				},
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
