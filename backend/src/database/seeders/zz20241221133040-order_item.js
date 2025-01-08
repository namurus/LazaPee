'use strict';

const order = require('../models/order');

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
    await queryInterface.bulkInsert('order_items', [{
    order_id: 1,
    skus_id: 1,
    quantity: 2,
    price: 99.99,
    created_at: new Date(),
    updated_at: new Date(),
    }, {
    order_id: 1,
    skus_id: 2,
    quantity: 1,
    price: 999.99,
    created_at: new Date(),
    updated_at: new Date(),
    }, {
    order_id: 3,
    skus_id: 3,
    quantity: 1,
    price: 199.99,
    created_at: new Date(),
    updated_at: new Date(),
    }, 
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
