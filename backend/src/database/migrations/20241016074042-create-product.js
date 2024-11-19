'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      productName: {
        type: Sequelize.STRING,
        field: 'productName',
      },
      brand: {
        type: Sequelize.STRING,
        field: 'brand',
      },
			image: {
				type: Sequelize.STRING,
				field: 'image',
			},
      thumbnail: {
        type: Sequelize.STRING,
        field: 'thumbnail',
      },
      slug: {
				type: Sequelize.STRING,
				field: 'slug',
			},
			discountPercentage: {
				type: Sequelize.INTEGER,
				field: 'discount_percentage',
			},
			categoryId: {
				type: Sequelize.INTEGER,
				field: 'category_id',
			},
      price: {
        type: Sequelize.FLOAT,
        field: 'price',
      },
      stock: {
        type: Sequelize.INTEGER,
        field: 'stock',
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description',
      },
      status: {
        type: Sequelize.ENUM('available', 'out of stock'),
        field: 'status',
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
      },

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};
