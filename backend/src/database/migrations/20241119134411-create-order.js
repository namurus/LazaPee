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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      status: {
        type: Sequelize.STRING,
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'shipping_address', // Tên trường trong cơ sở dữ liệu
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'payment_method', // Tên trường trong cơ sở dữ liệu
      },
      shippingCompany: {
        type: Sequelize.STRING,
        allowNull: true, // Có thể null vì không phải lúc nào cũng cần
        field: 'shipping_company', // Tên trường trong cơ sở dữ liệu
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
