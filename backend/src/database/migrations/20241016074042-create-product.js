'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      productName: {
        type: Sequelize.TEXT,
        field: 'productName',
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'brand',
      },
      thumbnail: {
        type: Sequelize.STRING,
        field: 'thumbnail',
      },
      image: {
        type: Sequelize.STRING,
        field: 'image',
      },
      price: {
        type: Sequelize.DECIMAL(10, 3),
        field: 'price',
      },
      stock: {
        type: Sequelize.JSON,
        field: 'stock',
        defaultValue: {},
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description',
      },
      status: {
        type: Sequelize.ENUM('available', 'out of stock'),
        field: 'status',
      },
      soldQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('product');
  }
};
