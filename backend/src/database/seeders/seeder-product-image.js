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
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 9,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 10,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 9,
                url: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 10,
                url: '',
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
