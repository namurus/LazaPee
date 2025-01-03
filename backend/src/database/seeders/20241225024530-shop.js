'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shops', [
      {
          shop_id: 1,
          shop_name: 'Tech Gadget Store',
          owner_id: 1,
          revenue: 100000,
          status: 'on',
          creation_date: new Date('2020-01-15'),
          location: '123 Tech Street, Silicon Valley',
          review_rating: 4.5,
          description: 'A store specializing in the latest tech gadgets.',
          product_number: 4,
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
          revenue: 50000,
          status: 'on',
          creation_date: new Date('2021-05-20'),
          location: '456 Fashion Ave, New York',
          review_rating: 4.0,
          description: 'Trendy fashion and accessories for all.',
          product_number: 4,
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
          revenue: 75000,
          status: 'on',
          creation_date: new Date('2019-10-10'),
          location: '789 Market Street, Boston',
          review_rating: 4.3,
          description: 'Your one-stop shop for household essentials.',
          product_number: 4,
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
          revenue: 20000,
          status: 'off',
          creation_date: new Date('2018-03-01'),
          location: '321 Book Blvd, Chicago',
          review_rating: 4.8,
          description: 'A paradise for book lovers with a wide range of genres.',
          product_number: 4,
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
