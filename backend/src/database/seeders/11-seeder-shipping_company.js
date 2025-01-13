'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('shipping_company', [
            {
                shippingCompanyId: 1,
                name: 'Giao Hàng Nhanh (GHN)',
                description: 'Dịch vụ giao hàng nhanh trên toàn quốc.',
                thumbnail: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Orange.png',
            },
            {
                shippingCompanyId: 2,
                name: 'Giao Hàng Tiết Kiệm (GHTK)',
                description: 'Dịch vụ giao hàng tiết kiệm chi phí.',
                thumbnail: 'https://cdn.prod.website-files.com/5fb85f26f126ce08d792d2d9/65fddafcf36551945213fe85_After_kime.jpg',
            },
            {
                shippingCompanyId: 3,
                name: 'Viettel Post',
                description: 'Dịch vụ vận chuyển của Viettel.',
                thumbnail: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Viettel-Post-Red.png',
            },
            {
                shippingCompanyId: 4,
                name: 'VNPost',
                description: 'Dịch vụ vận chuyển của Bưu điện Việt Nam.',
                thumbnail: 'https://inkythuatso.com/uploads/images/2021/12/logo-vnpost-inkythuatso-04-13-49-06.jpg',
            },
            {
                shippingCompanyId: 5,
                name: 'NowShip',
                description: 'Dịch vụ giao hàng nhanh của Now.',
                thumbnail: 'https://static.ybox.vn/2020/12/2/1608026166852-43.png',
            },
            {
                shippingCompanyId: 6,
                name: 'GrabExpress',
                description: 'Dịch vụ giao hàng của Grab.',
                thumbnail: 'https://images.seeklogo.com/logo-png/38/1/grabexpress-logo-png_seeklogo-382727.png',
            },
            {
                shippingCompanyId: 7,
                name: 'Lalamove',
                description: 'Dịch vụ giao hàng nhanh với đội ngũ chuyên nghiệp.',
                thumbnail: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Icon-Lalamove-Orange.png',
            },
            {
                shippingCompanyId: 8,
                name: 'Ahamove',
                description: 'Dịch vụ giao hàng nội thành nhanh chóng.',
                thumbnail: 'https://home.ahamove.com/wp-content/uploads/2022/02/Thie%CC%82%CC%81t-ke%CC%82%CC%81-kho%CC%82ng-te%CC%82n-1.png',
            },
            {
                shippingCompanyId: 9,
                name: 'Best Express',
                description: 'Dịch vụ giao hàng uy tín của Best Logistics.',
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErFEhr6kvJGQ308Rs-LOIzhBlj83PS3gWew&s',
            },
            {
                shippingCompanyId: 10,
                name: 'J&T Express',
                description: 'Dịch vụ vận chuyển đa quốc gia.',
                thumbnail: 'https://cdn.shopify.com/app-store/listing_images/0f226995e0a17d76493c21106d0a7f18/icon/CJSN57WbivwCEAE=.jpeg',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ShippingCompanies', null, {});
    },
};
