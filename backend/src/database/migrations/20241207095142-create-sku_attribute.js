'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sku_attribute', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attributeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'attribute',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      skuId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skus',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sku_attribute');
  }
};
