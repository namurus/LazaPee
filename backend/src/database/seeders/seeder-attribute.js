'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('attributes', [
      {
        name: 'default',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'size',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'color',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attributes', null, {});
  },
};