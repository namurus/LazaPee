'use strict';

const payment = require('../models/payment');
const shop = require('../models/shop');

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
    await queryInterface.bulkInsert('order', [{
      customer_id: 1,
      shop_id: 3,
      status: 'pending',
      full_name: 'John Doe',
      phone_number: '1234567890',
      shipping_address: '123 Main St, New York, NY 10001',
      shipping_type: 'standard',
      total_amount: 299.99,
      order_note: 'Please handle with care',
      payment_method: 'credit card',
      shipping_company: 'UPS',
      shipping_fee: 10,
      created_at: new Date(),
      updated_at: new Date(),

    }, {

      customer_id: 2,
      shop_id: 2,
      status: 'pending',
      full_name: 'Jane Doe',
      phone_number: '2345678901',
      shipping_address: '456 Elm St, Los Angeles, CA 90001',
      shipping_type: 'express',
      total_amount: 999.99,
      order_note: 'Please deliver before 5 PM',
      payment_method: 'COD',
      shipping_company: 'FedEx',
      shipping_fee: 20,
      created_at: new Date(),
      updated_at: new Date(),

    }, {

      customer_id: 2,
      shop_id: 1,
      status: 'completed',
      full_name: 'James Doe',
      phone_number: '3456789012',
      shipping_address: '789 Oak St, Chicago, IL 60001',
      shipping_type: 'standard',
      total_amount: 199.99,
      order_note: 'Please call before delivery',
      payment_method: 'credit card',
      shipping_company: 'USPS',
      shipping_fee: 15,
      created_at: '2025-01-07 13:26:36',
      updated_at: '2025-01-07 13:26:36',

    }, {

      customer_id: 1,
      shop_id: 3,
      status: 'cancelled',
      full_name: 'Jill Doe',
      phone_number: '4567890123',
      shipping_address: '012 Pine St, Houston, TX 70001',
      shipping_type: 'express',
      total_amount: 149.99,
      order_note: 'Please deliver after 3 PM',
      payment_method: 'COD',
      shipping_company: 'DHL',
      shipping_fee: 25,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      customer_id: 2,
      shop_id: 1,
      status: 'completed',
      full_name: 'John Doe',
      phone_number: '1234567890',
      shipping_address: '123 Main St, New York, NY 10001',
      shipping_type: 'standard',
      total_amount: 299.99,
      order_note: 'Please handle with care',
      payment_method: 'credit card',
      shipping_company: 'UPS',
      shipping_fee: 10,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
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
