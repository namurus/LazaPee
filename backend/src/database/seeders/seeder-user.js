'use strict';

import { hash } from 'bcrypt';

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                id: 1,
                full_name: 'John Doe',
                email: 'johndoe1@example.com',  // unique email
                password: await hash('password123', 10),
                avatar: 'https://example.com/avatar1.jpg',
                address: '123 Main St, Hometown',
                role: 'customer',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            },
            {
                full_name: 'Jane Smith',
                email: 'janesmith2@example.com',  // unique email
                password: await hash('securepass456', 10),
                avatar: 'https://example.com/avatar2.jpg',
                address: '456 Elm St, Cityville',
                role: 'admin',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            },
            // Add more users with unique emails as needed
        ];

        await queryInterface.bulkInsert('user', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user', null, {});
    },
};
