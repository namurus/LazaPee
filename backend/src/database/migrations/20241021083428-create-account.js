'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
				field: 'full_name',
				allowNull: false
      },
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'username'
			},
			password: { 
				type: Sequelize.STRING,
				allowNull: false,
				field: 'password'
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				field: 'role_id'
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				field: 'updated_at',
				onUpdate: Sequelize.literal("CURRENT_TIMESTAMP")
      },
			deletedAt: { 
				allowNull: true,
				type: Sequelize.DATE,
				field: 'deleted_at',
				onDelete: Sequelize.literal("CURRENT_TIMESTAMP")
			}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account');
  }
};
