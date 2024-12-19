'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Shops', {
      ShopID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'shop_id',
      },
      ShopName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'shop_name',
      },
      Revenue: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'revenue', 
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'status',
      },
      CreationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'creation_date',
      },
      Location: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'location',
      },
      ReviewRating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'review_rating', 
      },
      Description: {
        type: Sequelize.TEXT,
        field: 'description', 
      },
      ProductNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'product_number', 
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Shops');
  }
};
