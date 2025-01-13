'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shipping_company', {
      shippingCompanyId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'shippingCompanyId',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'name',
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description',
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'thumbnail',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('shipping_company');
  }
};
