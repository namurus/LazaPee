'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: 'order_id',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'product_id',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'price',
      },
      discountPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'discount_percentage',
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
				onDelete: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};