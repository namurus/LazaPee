'use strict';

const category = require("../models/category");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('product', [
            // Shop 1 - Đồ điện tử
            {
                id: 1,
                productName: 'Samsung Galaxy A20',
                brand: 'Samsung',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736592332/meygmpbds3ioddr3qgld.png',
                description: 'High-end smartphone with stunning display.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productName: 'Laptop HP Probook 430-G1',
                brand: 'HP',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736592672/ganfxwvt3qcthffzbf9j.jpg',
                description: 'Powerful laptop for work and gaming.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                productName: 'Tablet UltraTab 10',
                brand: 'BrandJ',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736592782/jgytsoykiwduxmluppo8.jpg',
                description: 'Lightweight tablet with high resolution.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productName: 'Smartwatch Active 2',
                brand: 'BrandK',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736592916/cvqfmxbkk3ziwpfljzql.jpg',
                description: 'Stylish smartwatch with health tracking.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                productName: 'Earbuds tws 43',
                brand: 'BrandL',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736593106/gznm0sugcy9hqxouk48k.jpg',
                description: 'Noise-cancelling wireless earbuds.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productName: 'Acer predator helios 300',
                brand: 'BrandM',
                shop_id: 1,
                thumbnail: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736593221/tjp9bbkwrwarfmorhovm.png',
                description: 'High-performance laptop for gamers.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                productName: 'Desktop Monitor UltraView',
                brand: 'BrandN',
                shop_id: 1,
                thumbnail: 'https://i.pcmag.com/imagery/reviews/04yXpm5uyjix6ORSzFZVOrA-1.fit_lim.size_919x518.v1693014357.jpg',
                description: 'Wide-screen monitor for professional use.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                productName: 'Gaming Headset HyperSound',
                brand: 'BrandO',
                shop_id: 1,
                thumbnail: 'https://gamingworldexperience.com/wp-content/uploads/2024/10/aa0928fa6407f60ccffb81e46804089a.jpg',
                description: 'Immersive sound quality for gaming.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                productName: 'External SSD Drive 1TB',
                brand: 'BrandP',
                shop_id: 1,
                thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/91YfRIy7kYL.jpg',
                description: 'Portable high-speed SSD drive.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                productName: 'Digital Camera VisionX',
                brand: 'BrandQ',
                shop_id: 1,
                thumbnail: 'https://m.media-amazon.com/images/I/61jM52DhS+L.jpg',
                description: 'Compact digital camera with 4K video.',
                category_id: 1,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            // Đồ gia dụng - Shop 2
            {
                id: 11,
                productName: 'Vacuum Cleaner X200',
                brand: 'BrandR',
                shop_id: 2,
                thumbnail: 'https://cdn.shopify.com/s/files/1/0577/0392/3805/files/X200Jet_M_EN_01.jpg?v=1702274408',
                description: 'High-power vacuum cleaner with multiple attachments.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                productName: 'Air Purifier CleanAir',
                brand: 'BrandS',
                shop_id: 2,
                thumbnail: 'https://bizweb.dktcdn.net/100/381/588/products/cleanair-488.jpg?v=1600413915117',
                description: 'Advanced air purifier for healthy living.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 13,
                productName: 'Blender PowerMix 500',
                brand: 'BrandT',
                shop_id: 2,
                thumbnail: 'https://5.imimg.com/data5/SELLER/Default/2024/8/440808946/QS/OZ/ZT/185148248/wyzr-500w-powermix-mixer-grinder.jpg',
                description: 'Multi-purpose blender for smoothies and more.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                productName: 'Microwave Oven HeatWave',
                brand: 'BrandU',
                shop_id: 2,
                thumbnail: 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/mg23k3575as-ef/gallery/africa-en-mw3500k-grill-with-heat-wave-grill-2-3-cu-ft-393054-mg23k3575as-ef-460197671?$684_547_PNG$',
                description: 'Efficient microwave with multiple cooking modes.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 15,
                productName: 'Electric Kettle FastBoil',
                brand: 'BrandV',
                shop_id: 2,
                thumbnail: 'https://m.media-amazon.com/images/I/61k5qe88LHL._AC_UF894,1000_QL80_.jpg',
                description: 'Quick and energy-efficient electric kettle.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 16,
                productName: 'Toaster ToastPro 300',
                brand: 'BrandW',
                shop_id: 2,
                thumbnail: 'https://ae01.alicdn.com/kf/S9baaf7492b90443f8b514de707881be87.jpg_640x640q90.jpg',
                description: 'Compact toaster with browning control.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 17,
                productName: 'The Miele G7000 Series Dishwasher',
                brand: 'BrandX',
                shop_id: 2,
                thumbnail: 'https://linhviet.vn/wp-content/uploads/z4464551252437_abd67295d8449bf16d0443e16240ca18.jpg',
                description: 'Energy-efficient dishwasher for spotless cleaning.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 18,
                productName: 'Refrigerator CoolMax 500L',
                brand: 'BrandY',
                shop_id: 2,
                thumbnail: 'https://challengeyachts.com/media/catalog/product/cache/90537d7511caa395e1323b416e1bcab3/0/8/0848_270l_fridge_freezer_front.jpg',
                description: 'Spacious refrigerator with frost-free technology.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 19,
                productName: 'Ceiling Fan WindFlow 52',
                brand: 'BrandZ',
                shop_id: 2,
                thumbnail: 'https://i.ebayimg.com/images/g/XAkAAOSwYVVm6hix/s-l1200.jpg',
                description: 'Silent ceiling fan with remote control.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 20,
                productName: 'Washing Machine TurboWash',
                brand: 'BrandA',
                shop_id: 2,
                thumbnail: 'https://m.media-amazon.com/images/I/31FctJgyBSL._AC_UF894,1000_QL80_.jpg',
                description: 'High-efficiency washing machine with quick wash feature.',
                category_id: 2,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            // Đồ chơi - Shop 3
            {
                id: 21,
                productName: 'Building Blocks Set',
                brand: 'BrandB',
                shop_id: 3,
                thumbnail: 'https://m.media-amazon.com/images/I/71jVEjU17nL._AC_UF894,1000_QL80_.jpg',
                description: 'Colorful building blocks for creative play.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 22,
                productName: 'Remote Control Car X-Speed',
                brand: 'BrandC',
                shop_id: 3,
                thumbnail: 'https://m.media-amazon.com/images/I/715U1DsZazL.jpg',
                description: 'High-speed remote control car with rechargeable battery.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 23,
                productName: 'Dollhouse DreamVilla',
                brand: 'BrandD',
                shop_id: 3,
                thumbnail: 'https://m.media-amazon.com/images/I/81zDsudg8pL.jpg',
                description: 'Luxurious dollhouse with detailed furniture.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 24,
                productName: 'Plush Toy BunnySoft',
                brand: 'BrandE',
                shop_id: 3,
                thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51elei2FwLL.jpg',
                description: 'Adorable and soft bunny plush toy.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 25,
                productName: 'Educational Puzzle ABC',
                brand: 'BrandF',
                shop_id: 3,
                thumbnail: 'https://i.ebayimg.com/images/g/0koAAOSwK~5h6Mhk/s-l1200.jpg',
                description: 'Interactive puzzle set for learning the alphabet.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 26,
                productName: 'Toy Kitchen Set MiniChef',
                brand: 'BrandG',
                shop_id: 3,
                thumbnail: 'https://m.media-amazon.com/images/I/715HkDqG7wL.jpg',
                description: 'Realistic kitchen set for imaginative cooking play.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 27,
                productName: 'Action Figure HeroX',
                brand: 'BrandH',
                shop_id: 3,
                thumbnail: 'https://m.media-amazon.com/images/I/41B-YfcGDJL._AC_UF1000,1000_QL80_.jpg',
                description: 'Collectible action figure with movable joints.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 28,
                productName: 'Board Game FunnyQuest',
                brand: 'BrandI',
                shop_id: 3,
                thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/813J0DBqCTL.jpg',
                description: 'Exciting board game for the whole family.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 29,
                productName: 'Lego Robotics Kit',
                brand: 'BrandJ',
                shop_id: 3,
                thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71CLgZVGwjL.jpg',
                description: 'Robotics kit for kids to build and program robots.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 30,
                productName: 'Art and Craft Kit CreativeFun',
                brand: 'Crayola',
                shop_id: 3,
                thumbnail: 'https://bom.so/joNiSE',
                description: 'Comprehensive art and craft kit for young artists.',
                category_id: 3,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 31,
                productName: 'T-Shirt Classic Fit',
                brand: 'Hanes',
                shop_id: 3,
                thumbnail: 'https://bom.so/GDFePK', // đen, trắng, xanh rêu, xám
                description: 'Comfortable cotton T-shirt in multiple colors.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 32,
                productName: 'Denim Jeans Slim Fit',
                brand: 'Levis',
                shop_id: 3,
                thumbnail: 'https://bom.so/qCiORA', // đen, xanh đen, xám khói, xanh sáng
                description: 'Stylish slim-fit denim jeans for casual wear.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 33,
                productName: 'Leather Jacket MotoStyle',
                brand: 'Harley-Davidson',
                shop_id: 3,
                thumbnail: 'https://bom.so/ZesiZe', // nâu, đen, xám, xanh rêu
                description: 'Premium leather jacket for a bold look.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 34,
                productName: 'Hoodie Winter Warm',
                brand: 'Champion',
                shop_id: 3,
                thumbnail: 'https://bom.so/sAUJnY', // hồng, xám, đen, xanh rêu
                description: 'Cozy hoodie perfect for cold weather.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 35,
                productName: 'Formal Shirt SlimFit',
                brand: 'Van Heusen',
                shop_id: 3,
                thumbnail: 'https://bom.so/p55WZI', // trắng, hồng, xanh, đen
                description: 'Elegant slim-fit formal shirt for office wear.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 36,
                productName: 'Sports Shorts ActiveWear',
                brand: 'Nike',
                shop_id: 3,
                thumbnail: 'https://bom.so/woGEJU', // đen, xanh ghi, xanh rêu, tím
                description: 'Breathable sports shorts for active lifestyle.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 37,
                productName: 'Polo Shirt Premium',
                brand: 'Ralph Lauren',
                shop_id: 3,
                thumbnail: 'https://bom.so/y6E6Tl', // Nâu đất, xanh rêu, be, trắng
                description: 'Classic polo shirt with a premium finish.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 38,
                productName: 'Skirt ElegantFlow',
                brand: 'H&M',
                shop_id: 3,
                thumbnail: 'https://bom.so/ZjmC10', // xám, đen, đỏ, be
                description: 'Elegant skirt for casual and formal occasions.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 39,
                productName: 'Tracksuit FlexPro',
                brand: 'Adidas',
                shop_id: 3,
                thumbnail: 'https://bom.so/s11qNz', //đen, xanh lục, xám
                description: 'Comfortable tracksuit for training and lounging.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 40,
                productName: 'Dress SummerBreeze',
                brand: 'Zara',
                shop_id: 3,
                thumbnail: 'https://bom.so/uvTBzh', // hồng, xanh dương, trắng, vàng
                description: 'Light and airy summer dress for sunny days.',
                category_id: 4,
                status: 'available',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('product', null, {});
    },
};
