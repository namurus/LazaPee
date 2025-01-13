'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('payements', [{
    customer_id: 1,
    order_id: 1,
    amount: 320000,
    status: 'pending',
    description: 'Payment for order 1',
    created_at: new Date(),
    updated_at: new Date(),
    }, {
    customer_id: 1,
    order_id: 3,
    amount: 120000,
    status: 'completed',
    description: 'Payment for order 2',
    created_at: new Date(),
    updated_at: new Date(),
    }, 
    {
      customer_id: 2,
      order_id: 5,
      amount: 370000,
      status: 'completed',
      description: 'Payment for order 3',
      created_at: new Date(),
      updated_at: new Date(),
    },
    ], {});
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
