'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_office', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      officeName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'officeName',
      },
      officeAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'officeAddress',
      },
      shipUnit: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'shipUnit',
      },
      shipCost: { // per km
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'shipCost',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_office');
  },
};
