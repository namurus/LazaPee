'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'product',
			[
				{
					id: 1,
					productName: 'Smartphone A1',
					brand: 'BrandX',
					thumbnail: 'https://example.com/images/a1_thumbnail.jpg',
					price: 299.99,
					stock: 50,
					description: 'A high-quality smartphone with excellent features.',
					status: 'available',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					id: 2,
					productName: 'Laptop Z5',
					brand: 'BrandY',
					thumbnail: 'https://example.com/images/z5_thumbnail.jpg',
					price: 999.99,
					stock: 30,
					description: 'A powerful laptop designed for productivity.',
					status: 'available',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					id: 3,
					productName: 'Headphones Pro',
					brand: 'BrandZ',
					thumbnail: 'https://example.com/images/headphones_thumbnail.jpg',
					price: 199.99,
					stock: 100,
					description: 'Noise-cancelling headphones with immersive sound quality.',
					status: 'available',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					id: 4,
					productName: 'Smartwatch S3',
					brand: 'BrandA',
					thumbnail: 'https://example.com/images/s3_thumbnail.jpg',
					price: 149.99,
					stock: 75,
					description: 'Smartwatch with health monitoring and notifications.',
					status: 'available',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					id: 5,
					productName: 'Tablet T10',
					brand: 'BrandB',
					thumbnail: 'https://example.com/images/t10_thumbnail.jpg',
					price: 399.99,
					stock: 40,
					description: 'Versatile tablet for work and entertainment.',
					status: 'out of stock',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					productName: "LapTop Accer 1000",
					brand: "Accer",
					thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhacom.vn%2Flaptop-acer-gaming-predator-helios-300-ph315-55-751d-nhqftsv002-win-11-den&psig=AOvVaw16XayxgZp4FhyMjhmHGkSb&ust=1734870624210000&source=images",
					image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhacom.vn%2Flaptop-acer-gaming-predator-helios-300-ph315-55-751d-nhqftsv002-win-11-den&psig=AOvVaw16XayxgZp4FhyMjhmHGkSb&ust=1734870624210000&source=images",
					price: 500,
					stock: 10,
					description: "Thông số sản phẩmCPU: Intel Core i7-12700H (14 nhân, 20 luồng, 3.5GHz upto 4.7GHz, 24MB)",
					status: "available",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					"productName": "Áo thun nam",
					"brand": "SaiGonnese",
					"thumbnail": "https://product.hstatic.net/200000404243/product/a2mn438r2-cnma",
					"image": "https://product.hstatic.net/200000404243/product/a2mn438r2-cnma",
					"price": 25,
					"stock": 50,
					"description": "Form Regular, lai bằng Chất liệu: 59% Polyester - 35% Recycle S.Cafe Poly - 6% Spandex",
					"status": "available",
					"deleted_at": null,
					created_at: new Date(),
					updated_at: new Date(),
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
