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

        ]);
    },

    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('skus', null, {});
    }
};


