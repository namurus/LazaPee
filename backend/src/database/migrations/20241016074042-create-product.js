'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        field: 'full_name',
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'brand',
      },
      image: {
        type: DataTypes.STRING,
        field: 'image',
      },
      price: {
        type: DataTypes.DECIMAL,
        field: 'price',
      },
      stock: {
        type: DataTypes.INTEGER,
        field: 'stock',
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
