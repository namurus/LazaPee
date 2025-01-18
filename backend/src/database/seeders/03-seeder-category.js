'use strict';
import slugify from 'slugify';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'category',
			[
				{
					id: 1,
					name: 'Electronics',
					description: 'Electronics products',
					slug: 'electronics',
					thumbnail: 'https://bom.so/mYjiux',
				},
				{
					id: 2,
					name: 'Household appliances',
					description: 'Household appliances products',
					slug: 'household-appliances',
					thumbnail: 'https://bom.so/wGP8oh',
				},
				{
					id: 3,
					name: 'Toys',
					description: 'Toys products',
					slug: 'toys',
					thumbnail: 'https://bom.so/wOxwP0',
				},
				{
					id: 4,
					name: 'Clothing',
					description: 'Clothing products',
					slug: 'clothing',
					thumbnail: 'https://bom.so/H16iGF',
				},
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
