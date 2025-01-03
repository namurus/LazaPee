'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('attribute', [
      {
        name: 'default',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'size',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'color',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'material',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
          name: 'warranty',
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
          name: 'edition',
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
          name: 'weight',
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
          name: 'paper_type',
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
          name: 'binding',
          created_at: new Date(),
          updated_at: new Date(),
      },
      {
          name: 'language',
          created_at: new Date(),
          updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attribute', null, {});
  },
};