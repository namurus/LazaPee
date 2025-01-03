'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shops', [
      {
          shop_id: 1,
          shop_name: 'Tech Gadget Store',
          owner_id: 1,
          status: 'on',
          description: 'A store specializing in the latest tech gadgets.',
          temporary_closure_period: null,
          temporary_closure_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
      },
      {
          shop_id: 2,
          shop_name: 'Fashion Boutique',
          owner_id: 2,
          status: 'on',
          description: 'Trendy fashion and accessories for all.',
          temporary_closure_period: null,
          temporary_closure_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
      },
      {
          shop_id: 3,
          shop_name: 'General Store',
          owner_id: 3,
          status: 'on',
          description: 'Your one-stop shop for household essentials.',
          temporary_closure_period: null,
          temporary_closure_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
      },
      {
          shop_id: 4,
          shop_name: 'Book Haven',
          owner_id: 4,
          status: 'off',
          description: 'A paradise for book lovers with a wide range of genres.',
          temporary_closure_period: 30,
          temporary_closure_reason: 'Renovations',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
