'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'category',
			[
				{	id: 1, 
					name: "Electronics",
					description: "Electronics products", 
					thumbnail: "https://bom.so/mYjiux",
				},
				{
					id: 2,
					name: "Household appliances",
					description: "Household appliances products",
					thumbnail: "https://bom.so/wGP8oh",
				},
				{
					id: 3,
					name: "Toys",
					description: "Toys products",
					thumbnail: "https://bom.so/wOxwP0",
				},
				{
					id: 4,
					name: "Clothing",
					description: "Clothing products",
					thumbnail: "https://bom.so/H16iGF",
				},
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
