'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('forgot-passwords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			otp: {
				type: Sequelize.STRING,
				allowNull: false
			},
			resetToken: {
				type: Sequelize.STRING,
				allowNull: true
			},
			expiredAt: {
				type: Sequelize.DATE,
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
			},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('forgot-passwords');
  }
};
