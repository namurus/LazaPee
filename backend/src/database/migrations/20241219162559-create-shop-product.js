'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shop_product', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        field: 'id',
      },
      shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Shops',
        //   key: 'shop_id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'shop_id',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'product',
        //   key: 'id',
        // },
        field: 'product_id',
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
    await queryInterface.dropTable('shop_products');
  }
};