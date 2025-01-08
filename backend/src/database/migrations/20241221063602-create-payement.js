'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payements', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        field: 'id',
        primaryKey: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'customer_id',
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'amount',
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'order_id'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'description'
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
        field: 'status'
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
    await queryInterface.dropTable('payements');
  }
};