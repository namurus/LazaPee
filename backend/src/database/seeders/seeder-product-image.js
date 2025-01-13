'use strict';

const product = require("../models/product");

module.exports = {
    up: async (queryInterface, Sequelize) => {  
        await queryInterface.bulkInsert('product-images', [
            {
                productId: 1,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592332/meygmpbds3ioddr3qgld.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592333/xqgatj2osle1iqm4zym3.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592672/ganfxwvt3qcthffzbf9j.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592673/gsvenrdsy7cu9rnrshsm.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592782/jgytsoykiwduxmluppo8.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592781/uflmwmzwstxivgaeqwrc.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592916/cvqfmxbkk3ziwpfljzql.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736592918/gyf0ayhgat8bioe21aya.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736593106/gznm0sugcy9hqxouk48k.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736593104/diaqf9tbrwcw1ujcrbvr.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736593221/tjp9bbkwrwarfmorhovm.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                url: "http://res.cloudinary.com/dlao1onv5/image/upload/v1736593219/cx8d51adquu54lf6laza.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                url: 'https://i.pcmag.com/imagery/reviews/04yXpm5uyjix6ORSzFZVOrA-1.fit_lim.size_919x518.v1693014357.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                url: 'https://www.digitaltigers.com/images/product/gallery/uvduo32-wid1260.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                url: 'https://gamingworldexperience.com/wp-content/uploads/2024/10/aa0928fa6407f60ccffb81e46804089a.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                url: 'https://gamingedgehubx.com/wp-content/uploads/2024/09/3a129a49b10ea2b9b96a7d5dd85fe2fd.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 9,
                url: 'https://images-na.ssl-images-amazon.com/images/I/91YfRIy7kYL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 9,
                url: 'https://thietbiluutru.com.vn/media/product/1403_t3_1.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 10,
                url: 'https://m.media-amazon.com/images/I/61jM52DhS+L.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 10,
                url: 'https://s.alicdn.com/@sc04/kf/H1fc34014c7b44def8bdeb07d41b751adH.jpg_720x720q50.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 11,
                url: 'https://cdn.shopify.com/s/files/1/0577/0392/3805/files/X200Jet_M_EN_01.jpg?v=1702274408',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 11,
                url: 'https://shop.roidmi.com/cdn/shop/files/6_b50204e3-c361-4bc5-bbf5-78ed312cb168_x368@2x.jpg?v=1702274100',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 12,
                url: 'https://bizweb.dktcdn.net/100/381/588/products/cleanair-488.jpg?v=1600413915117',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 12,
                url: 'https://bizweb.dktcdn.net/100/381/588/files/cleanair-488-1.jpg?v=1600413086310',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 13,
                url: 'https://5.imimg.com/data5/SELLER/Default/2024/8/440808946/QS/OZ/ZT/185148248/wyzr-500w-powermix-mixer-grinder.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 13,
                url: 'https://www.electroluxgroup.com/wp-content/uploads/sites/2/2010/07/Powermix-Silent-by-Electrolux-2.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 14,
                url: 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/mg23k3575as-ef/gallery/africa-en-mw3500k-grill-with-heat-wave-grill-2-3-cu-ft-393054-mg23k3575as-ef-460197671?$684_547_PNG$',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 14,
                url: 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/mg23k3575as-ef/gallery/africa-en-mw3500k-grill-with-heat-wave-grill-2-3-cu-ft-393054-mg23k3575as-ef-460197650?$684_547_PNG$',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 15,
                url: 'https://m.media-amazon.com/images/I/61k5qe88LHL._AC_UF894,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 15,
                url: 'https://m.media-amazon.com/images/I/51s5W9EWfrL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 16,
                url: 'https://ae01.alicdn.com/kf/S9baaf7492b90443f8b514de707881be87.jpg_640x640q90.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 16,
                url: 'https://m.media-amazon.com/images/I/71gUOx77YwL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 17,
                url: 'https://linhviet.vn/wp-content/uploads/z4464551252437_abd67295d8449bf16d0443e16240ca18.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 17,
                url: 'https://media.miele.com/images/2000017/200001731/20000173128.png?d=540&impolicy=boxed',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 18,
                url: 'https://challengeyachts.com/media/catalog/product/cache/90537d7511caa395e1323b416e1bcab3/0/8/0848_270l_fridge_freezer_front.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 18,
                url: 'https://challengeyachts.com/media/catalog/product/cache/eec8f5df8ff8f79144a81af32667aae9/0/8/0870_500l_freestanding_fridge.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 19,
                url: 'https://i.ebayimg.com/images/g/XAkAAOSwYVVm6hix/s-l1200.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 19,
                url: 'https://prominencehome.com/cdn/shop/files/04-50585_2000x.jpg?v=1722367267',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 20,
                url: 'https://m.media-amazon.com/images/I/31FctJgyBSL._AC_UF894,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 20,
                url: 'https://cdn.shopify.com/s/files/1/0630/5362/7541/files/F4Y913BCTA1.jpg?v=1726252796',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 21,
                url: 'https://m.media-amazon.com/images/I/71jVEjU17nL._AC_UF894,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 21,
                url: 'https://m.media-amazon.com/images/I/71mnsQS0n1L._AC_SL1500_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 22,
                url: 'https://m.media-amazon.com/images/I/715U1DsZazL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 22,
                url: 'https://m.media-amazon.com/images/I/61wnUN-HHML.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 23,
                url: 'https://m.media-amazon.com/images/I/81zDsudg8pL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 23,
                url: 'https://m.media-amazon.com/images/I/91WJ8mVLJuL._AC_UF1000,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 24,
                url: 'https://images-na.ssl-images-amazon.com/images/I/51elei2FwLL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 24,
                url: 'https://m.media-amazon.com/images/I/61KkKDPPY1L._AC_UF1000,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 25,
                url: 'https://i.ebayimg.com/images/g/0koAAOSwK~5h6Mhk/s-l1200.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 25,
                url: 'https://popupkids.in/cdn/shop/files/WoodenAlphabetEducationalPuzzleToy1_1024x1024.jpg?v=1687236082',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 26,
                url: 'https://m.media-amazon.com/images/I/715HkDqG7wL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 26,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj5KegHv0wvgAIDN3iHIry6E6M902TV7nLwQ&s',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 27,
                url: 'https://m.media-amazon.com/images/I/41B-YfcGDJL._AC_UF1000,1000_QL80_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 27,
                url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsrfo8ouv9ok22',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 28,
                url: 'https://images-na.ssl-images-amazon.com/images/I/813J0DBqCTL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 28,
                url: 'https://cdp-api.printgo.vn/uploads/images/z5919090459181_24632245552c1592e51f9c90e6bbf56e.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 29,
                url: 'https://images-na.ssl-images-amazon.com/images/I/71CLgZVGwjL.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 29,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mBX72YTwHYsis3nJoclQlOfVo2gqxt7CvA&s',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 30,
                url: 'https://bom.so/JlOeru',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 30,
                url: 'https://bom.so/mOKNlQ',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 30,
                url: 'https://bom.so/xdbAQc',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 30,
                url: 'https://bom.so/QfLLWw',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 30,
                url: 'https://bom.so/6Zl7JB',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 31,
                url: 'https://bom.so/jHglr2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 31,
                url: 'https://bom.so/206OwP',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 31,
                url: 'https://bom.so/Ihzjj7',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 31,
                url: 'https://bom.so/zlUzls',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 32,
                url: 'https://bom.so/B37B25',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 32,
                url: 'https://bom.so/W4uAvf',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 32,
                url: 'https://bom.so/bXzVer',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 32,
                url: 'https://bom.so/Wdm8ag',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 33,
                url: 'https://bom.so/wLz9Ez',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 33,
                url: 'https://bom.so/WERPlG',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 33,
                url: 'https://bom.so/qlaXk2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 33,
                url: 'https://bom.so/b5CqZD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 34,
                url: 'https://bom.so/AyDYy3',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 34,
                url: 'https://bom.so/UTY6ho',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 34,
                url: 'https://bom.so/ro8Gst',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 34,
                url: 'https://bom.so/cXfKNo',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 35,
                url: 'https://bom.so/R8bEm8',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 35,
                url: 'https://bom.so/NmQ05N',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 35,
                url: 'https://bom.so/DdsixN',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 35,
                url: 'https://bom.so/zAC8Pm',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 36,
                url: 'https://bom.so/PuqqvR',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 36,
                url: 'https://bom.so/pVMwCw',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 36,
                url: 'https://bom.so/eGQgdu',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 36,
                url: 'https://bom.so/3h4MYa',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 37,
                url: 'https://bom.so/jjDVeC',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 37,
                url: 'https://bom.so/UceEXi',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 37,
                url: 'https://bom.so/FUM6yk',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 37,
                url: 'https://bom.so/uqJyRC',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 38,
                url: 'https://bom.so/E4ylKo',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 38,
                url: 'https://bom.so/A6pXQY',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 38,
                url: 'https://bom.so/ySIABd',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 38,
                url: 'https://bom.so/D07VSF',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 39,
                url: 'https://bom.so/x9NArq',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 39,
                url: 'https://bom.so/7aTAhL',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 39,
                url: 'https://bom.so/DWRgK6',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 39,
                url: 'https://bom.so/LSvVsX',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 40,
                url: 'https://bom.so/KFe0Hf',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 40,
                url: 'https://bom.so/y0vbkt',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 40,
                url: 'https://bom.so/UPGGIG',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 40,
                url: 'https://bom.so/hmJfJU',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('product-images', null, {});
    }
};
