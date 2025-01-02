'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const data = [
            {
                officeName: 'Bưu điện Quận 1',
                officeAddress: '2 Công xã Paris, Quận 1, TP. Hồ Chí Minh',
                shipUnit: 'Giao Hàng Nhanh',
                shipCost: 10.5,
            },
            {
                officeName: 'Bưu điện Quận 2',
                officeAddress: '168 Trần Não, Quận 2, TP. Hồ Chí Minh',
                shipUnit: 'VietNamPost',
                shipCost: 8.0,
            },
            {
                officeName: 'Bưu điện Quận 3',
                officeAddress: '1 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh',
                shipUnit: 'J&T Express',
                shipCost: 12.0,
            },
            {
                officeName: 'Bưu điện Quận 4',
                officeAddress: '12 Nguyễn Tất Thành, Quận 4, TP. Hồ Chí Minh',
                shipUnit: 'Giao Hàng Tiết Kiệm',
                shipCost: 9.5,
            },
            {
                officeName: 'Bưu điện Quận 5',
                officeAddress: '135 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh',
                shipUnit: 'Giao Hàng Nhanh',
                shipCost: 7.8,
            },
            {
                officeName: 'Bưu điện Quận 6',
                officeAddress: '521 Hậu Giang, Quận 6, TP. Hồ Chí Minh',
                shipUnit: 'Ninja Van',
                shipCost: 11.2,
            },
            {
                officeName: 'Bưu điện Quận 7',
                officeAddress: '25 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh',
                shipUnit: 'Giao Hàng Tiết Kiệm',
                shipCost: 10.0,
            },
            {
                officeName: 'Bưu điện Quận 8',
                officeAddress: '44 Âu Dương Lân, Quận 8, TP. Hồ Chí Minh',
                shipUnit: 'J&T Express',
                shipCost: 8.5,
            },
            {
                officeName: 'Bưu điện Quận 9',
                officeAddress: '233 Đỗ Xuân Hợp, Quận 9, TP. Hồ Chí Minh',
                shipUnit: 'Giao Hàng Nhanh',
                shipCost: 13.0,
            },
            {
                officeName: 'Bưu điện Quận 10',
                officeAddress: '285 Cách Mạng Tháng Tám, Quận 10, TP. Hồ Chí Minh',
                shipUnit: 'DHL',
                shipCost: 9.0,
            },
        ];

        // Gán thêm timestamps (nếu cần) để tránh lỗi
        const timestampedData = data.map((item) => ({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        // Insert dữ liệu
        await queryInterface.bulkInsert('post_office', timestampedData, {});
    },

    async down(queryInterface, Sequelize) {
        // Xóa dữ liệu nếu cần rollback
        await queryInterface.bulkDelete('post_office', null, {});
    },
};
    