'use strict';

const category = require("../models/category");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('product', [
            {
                id: 1,
                productName: 'Smartphone A1',
                brand: 'BrandX',
                shop_id: 1,
                category_id: 5,
                thumbnail: 'https://example.com/images/a1_thumbnail.jpg',
                description: 'A high-quality smartphone with excellent features.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productName: 'Laptop Z5',
                brand: 'BrandY',
                shop_id: 1,
                category_id: 5,
                thumbnail: 'https://example.com/images/z5_thumbnail.jpg',
                description: 'A powerful laptop designed for productivity.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                productName: 'Headphones Pro',
                brand: 'BrandZ',
                shop_id: 1,
                category_id: 3,
                thumbnail: 'https://example.com/images/headphones_thumbnail.jpg',
                description: 'Noise-cancelling headphones with immersive sound quality.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productName: 'Smartwatch S3',
                brand: 'BrandA',
                shop_id: 1,
                category_id: 6,
                thumbnail: 'https://example.com/images/s3_thumbnail.jpg',
                description: 'Smartwatch with health monitoring and notifications.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                productName: 'Casual T-Shirt',
                brand: 'BrandF',
                shop_id: 2,
                category_id: 7,
                thumbnail: 'https://example.com/images/tshirt_thumbnail.jpg',
                description: 'Comfortable and stylish casual t-shirt.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productName: 'Denim Jeans',
                brand: 'BrandG',
                shop_id: 2,
                category_id: 7,
                thumbnail: 'https://example.com/images/jeans_thumbnail.jpg',
                description: 'Classic fit denim jeans.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                productName: 'Sneakers Pro',
                brand: 'BrandH',
                shop_id: 2,
                category_id: 8,
                thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
                description: 'Stylish sneakers for everyday wear.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                productName: 'Leather Jacket',
                brand: 'BrandI',
                shop_id: 1,
                category_id: 8,
                thumbnail: 'https://example.com/images/jacket_thumbnail.jpg',
                description: 'Premium leather jacket.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },

            // Products for General Store
            {
                id: 9,
                productName: 'Cleaning Spray',
                brand: 'BrandJ',
                shop_id: 3,

                thumbnail: 'https://example.com/images/spray_thumbnail.jpg',
                description: 'Multi-purpose cleaning spray.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                productName: 'Kitchen Towels',
                brand: 'BrandK',
                shop_id: 3,
                thumbnail: 'https://example.com/images/towels_thumbnail.jpg',
                description: 'Highly absorbent kitchen towels.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 11,
                productName: 'Storage Boxes',
                brand: 'BrandL',
                shop_id: 3,
                thumbnail: 'https://example.com/images/boxes_thumbnail.jpg',
                description: 'Durable and stackable storage boxes.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                productName: 'Hand Soap',
                brand: 'BrandM',
                shop_id: 3,
                thumbnail: 'https://example.com/images/soap_thumbnail.jpg',
                description: 'Gentle and moisturizing hand soap.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },

            // Products for Book Haven (off)
            {
                id: 13,
                productName: 'Mystery Novel',
                brand: 'BrandN',
                shop_id: 3,
                thumbnail: 'https://example.com/images/novel_thumbnail.jpg',
                description: 'A thrilling mystery novel.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                productName: 'Science Textbook',
                brand: 'BrandO',
                shop_id: 3,
                thumbnail: 'https://example.com/images/textbook_thumbnail.jpg',
                description: 'Comprehensive science textbook.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 15,
                productName: 'Cookbook Master',
                brand: 'BrandP',
                shop_id: 3,
                thumbnail: 'https://example.com/images/cookbook_thumbnail.jpg',
                description: 'A guide to master culinary skills.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 16,
                productName: 'Art History Book',
                brand: 'BrandQ',
                shop_id: 3,
                thumbnail: 'https://example.com/images/arthistory_thumbnail.jpg',
                description: 'An exploration of art history.',
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
