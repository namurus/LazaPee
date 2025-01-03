'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'hashed_password_123', 
        avatar: 'https://example.com/avatar1.png',
        phone: '1234567890',
        address: '123 Main Street, Cityville',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        username: 'janesmith',
        password: 'hashed_password_456', 
        avatar: 'https://example.com/avatar2.png',
        phone: '0987654321',
        address: '456 High Street, Townsville',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Người dùng mới thứ 1
      {
        full_name: 'Alice Brown',
        email: 'alice.brown@example.com',
        username: 'alicebrown',
        password: 'hashed_password_789', 
        avatar: 'https://example.com/avatar3.png',
        phone: '1122334455',
        address: '789 Low Street, Metropolis',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Người dùng mới thứ 2
      {
        full_name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        username: 'bobjohnson',
        password: 'hashed_password_321', 
        avatar: 'https://example.com/avatar4.png',
        phone: '5566778899',
        address: '101 High Hill, Riverside',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
			// Người dùng mới thứ 2
      {
        full_name: 'Shop Owner',
        email: 'shop@example.com',
        username: 'shopowner',
        password: 'hashed_password_321', 
        avatar: 'https://example.com/avatar4.png',
        phone: '5566778899',
        address: '101 High Hill, Riverside',
        role: 'shop',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
