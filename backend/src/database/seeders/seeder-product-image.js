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
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('product-images', null, {});
    }
};
