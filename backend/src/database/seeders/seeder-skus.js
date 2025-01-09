'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('skus', [
            {
                id: 1,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                productId: 2,
                price: 2000,
                stock_quantity: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productId: 2,
                price: 2000,
                stock_quantity: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                productId: 7,
                price: 1800,
                stock_quantity: 25,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                productId: 7,
                price: 1800,
                stock_quantity: 25,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                productId: 8,
                price: 2200,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                productId: 8,
                price: 2200,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 11,
                productId: 9,
                price: 1500,
                stock_quantity: 30,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                productId: 10,
                price: 2500,
                stock_quantity: 12,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 13,
                productId: 10,
                price: 2500,
                stock_quantity: 12,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                productId: 11,
                price: 3000,
                stock_quantity: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 15,
                productId: 12,
                price: 1200,
                stock_quantity: 20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 16,
                productId: 13,
                price: 2000,
                stock_quantity: 15,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 17,
                productId: 13,
                price: 2000,
                stock_quantity: 15,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 18,
                productId: 14,
                price: 1800,
                stock_quantity: 20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 19,
                productId: 14,
                price: 1800,
                stock_quantity: 20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 20,
                productId: 15,
                price: 2500,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 21,
                productId: 15,
                price: 2500,
                stock_quantity: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 22,
                productId: 16,
                price: 3000,
                stock_quantity: 8,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 23,
                productId: 16,
                price: 3000,
                stock_quantity: 8,
                created_at: new Date(),
                updated_at: new Date()
            },
        ]);
    },

    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('skus', null, {});
    }
};


