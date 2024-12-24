'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'customer_id',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'pending',
        field: 'status',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'phone_number',
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'shipping_address', 
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'total_amount',
      },
      orderNote: {
        type: Sequelize.STRING,
        allowNull: true, 
        field: 'order_note',
      },
      shippingCompany: {
        type: Sequelize.STRING,
        allowNull: false, 
        field: 'shipping_company',
      },
      shipingFee: {
        type: Sequelize.FLOAT,
        allowNull: false, 
        field: 'shipping_fee',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  },
};
