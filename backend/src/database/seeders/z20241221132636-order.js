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
      id: 1,
      customer_id: 1,
      shop_id: 3,
      status: 'pending',
      full_name: 'Nguyễn Văn Bảo',
      phone_number: '0977466534',
      shipping_address: '38, Bùi Thị Xuân, Quận 1, TP.HCM',
      shipping_type: 'standard',
      total_amount: 300000,
      order_note: 'Please handle with care',
      payment_method: 'credit card',
      shipping_company: 'UPS',
      shipping_fee: 20000,
      created_at: new Date(),
      updated_at: new Date(),

    }, {
      id: 2,
      customer_id: 2,
      shop_id: 2,
      status: 'pending',
      full_name: 'Phạm Trần Tiến',
      phone_number: '0987654321',
      shipping_address: '84 Nguyễn Du, Quận 2, TP.HCM',
      shipping_type: 'express',
      total_amount: 150000,
      order_note: 'Please deliver before 5 PM',
      payment_method: 'COD',
      shipping_company: 'FedEx',
      shipping_fee: 40000,
      created_at: new Date(),
      updated_at: new Date(),

    }, {
      id: 3,
      customer_id: 1,
      shop_id: 1,
      status: 'shipped',
      full_name: 'Nguyễn Văn Bảo',
      phone_number: '0977466534',
      shipping_address: '101 Tây Sơn, Hà Nội, Việt Nam',
      shipping_type: 'standard',
      total_amount: 100000,
      order_note: 'Please call before delivery',
      payment_method: 'credit card',
      shipping_company: 'USPS',
      shipping_fee: 20000,
      created_at: '2025-01-07 13:26:36',
      updated_at: '2025-01-07 13:26:36',

    }, {
      id: 4,  
      customer_id: 2,
      shop_id: 3,
      status: 'cancelled',
      full_name: 'Phạm Trần Tiến',
      phone_number: '0987654321',
      shipping_address: '84 Nguyễn Du, Quận 2, TP.HCM',
      shipping_type: 'express',
      total_amount: 250000,
      order_note: 'Please deliver after 3 PM',
      payment_method: 'COD',
      shipping_company: 'DHL',
      shipping_fee: 40000,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 5,
      customer_id: 2,
      shop_id: 1,
      status: 'shipping',
      full_name: 'Phạm Trần Tiến',
      phone_number: '0987654321',
      shipping_address: '84 Nguyễn Du, Quận 2, TP.HCM',
      shipping_type: 'standard',
      total_amount: 350000,
      order_note: 'Please handle with care',
      payment_method: 'credit card',
      shipping_company: 'UPS',
      shipping_fee: 20000,
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
