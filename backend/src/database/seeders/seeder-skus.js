'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('skus', [
            {
                id: 1,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                attributeName: 'color',
                value: 'black',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                attributeName: 'color',
                value: 'white',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                attributeName: 'size',
                value: 'X',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                attributeName: 'size',
                value: 'X',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                productId: 2,
                price: 2000,
                stock_quantity: 5,
                attributeName: 'color',
                value: 'black',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productId: 2,
                price: 2000,
                stock_quantity: 5,
                attributeName: 'color',
                value: 'silver',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                productId: 7,
                price: 1800,
                stock_quantity: 25,
                attributeName: 'color',
                value: 'green',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                productId: 7,
                price: 1800,
                stock_quantity: 25,
                attributeName: 'color',
                value: 'yellow',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                productId: 8,
                price: 2200,
                stock_quantity: 10,
                attributeName: 'material',
                value: 'metal',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                productId: 8,
                price: 2200,
                stock_quantity: 10,
                attributeName: 'material',
                value: 'plastic',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 11,
                productId: 9,
                price: 1500,
                stock_quantity: 30,
                attributeName: 'size',
                value: 'XXL',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                productId: 10,
                price: 2500,
                stock_quantity: 12,
                attributeName: 'warranty',
                value: '1 year',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 13,
                productId: 10,
                price: 2500,
                stock_quantity: 12,
                attributeName: 'warranty',
                value: '2 years',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                productId: 11,
                price: 3000,
                stock_quantity: 5,
                attributeName: 'edition',
                value: 'limited',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 15,
                productId: 12,
                price: 1200,
                stock_quantity: 20,
                attributeName: 'weight',
                value: 'lightweight',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 16,
                productId: 13,
                price: 2000,
                stock_quantity: 15,
                attributeName: 'paper_type',
                value: 'glossy',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 17,
                productId: 13,
                price: 2000,
                stock_quantity: 15,
                attributeName: 'paper_type',
                value: 'matte',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 18,
                productId: 14,
                price: 1800,
                stock_quantity: 20,
                attributeName: 'binding',
                value: 'hardcover',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 19,
                productId: 14,
                price: 1800,
                stock_quantity: 20,
                attributeName: 'binding',
                value: 'paperback',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 20,
                productId: 15,
                price: 2500,
                stock_quantity: 10,
                attributeName: 'language',
                value: 'English',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 21,
                productId: 15,
                price: 2500,
                stock_quantity: 10,
                attributeName: 'language',
                value: 'French',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 22,
                productId: 16,
                price: 3000,
                stock_quantity: 8,
                attributeName: 'edition',
                value: 'collector',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 23,
                productId: 16,
                price: 3000,
                stock_quantity: 8,
                attributeName: 'edition',
                value: 'standard',
                created_at: new Date(),
                updated_at: new Date()
            },
        ]);
    },

    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('skus', null, {});
    }
};


