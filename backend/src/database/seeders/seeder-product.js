'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('product', [
            {
                id: 1,
                productName: 'Smartphone A1',
                brand: 'BrandX',
                thumbnail: 'https://example.com/images/a1_thumbnail.jpg',
                image: 'https://example.com/images/a1.jpg',
                description: 'A high-quality smartphone with excellent features.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productName: 'Laptop Z5',
                brand: 'BrandY',
                thumbnail: 'https://example.com/images/z5_thumbnail.jpg',
                image: 'https://example.com/images/z5.jpg',
                description: 'A powerful laptop designed for productivity.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                productName: 'Headphones Pro',
                brand: 'BrandZ',
                thumbnail: 'https://example.com/images/headphones_thumbnail.jpg',
                image: 'https://example.com/images/headphones.jpg',
                description: 'Noise-cancelling headphones with immersive sound quality.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productName: 'Smartwatch S3',
                brand: 'BrandA',
                thumbnail: 'https://example.com/images/s3_thumbnail.jpg',
                image: 'https://example.com/images/s3.jpg',
                description: 'Smartwatch with health monitoring and notifications.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                productName: 'Tablet T10',
                brand: 'BrandB',
                thumbnail: 'https://example.com/images/t10_thumbnail.jpg',
                image: 'https://example.com/images/t10.jpg',
                description: 'Versatile tablet for work and entertainment.',
                status: 'out of stock',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productName: 'Điện thoại A1',
                brand: 'BrandD',
                thumbnail: 'https://example.com/images/t10_thumbnail.jpg',
                image: 'https://example.com/images/t10.jpg',
                description: 'Versatile tablet for work and entertainment.',
                status: 'out of stock',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
