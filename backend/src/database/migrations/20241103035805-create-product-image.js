'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product-images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			productId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			url: {
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
			deletedAt: { 
				allowNull: true,
				type: Sequelize.DATE,
				onDelete: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product-images');
  }
};
