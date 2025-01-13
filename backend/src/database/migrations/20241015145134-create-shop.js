'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shops', {
      shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'shop_id',
      },
      shopName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'shop_name',
      },
			background: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'background',
			},
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'owner_id',
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'status',
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description', 
      },
      temporaryClosurePeriod: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'temporary_closure_period',
      },
      temporaryClosureReason: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'temporary_closure_reason',
      },
      dateClosed: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'date_closed',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('shops');
  }
};
