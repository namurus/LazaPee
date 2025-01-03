'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_item', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'quantity',
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'cart_id',
      },
      skusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'skus_id',
        references: {
          model: 'skus',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        field: 'price',
      },
      discountPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'discount_percentage',
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
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_item');
  }
};
