'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE product
      ADD FULLTEXT INDEX product_name_fulltext_idx (productName);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE product
      DROP INDEX product_name_fulltext_idx;
    `);
  }
};