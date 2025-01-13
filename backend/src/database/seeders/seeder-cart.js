'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'cart',
            [
                {
                    user_id: 1,
                },
                {
                    user_id: 2,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('cart', null, {});
    },
};
