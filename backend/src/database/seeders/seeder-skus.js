'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('skus', [
            // SKUs for Product 1
            {
                id: 1,
                productId: 1,
                price: 1000,
                stock_quantity: 10,
                color: 'red',
                size: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                productId: 1,
                price: 1000,
                stock_quantity: 15,
                color: 'blue',
                size: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 2
            {
                id: 3,
                productId: 2,
                price: 1500,
                stock_quantity: 20,
                color: 'silver',
                size: '15-inch',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                productId: 2,
                price: 1500,
                stock_quantity: 25,
                color: 'black',
                size: '17-inch',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 3
            {
                id: 5,
                productId: 3,
                price: 800,
                stock_quantity: 30,
                color: 'gold',
                size: '10-inch',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                productId: 3,
                price: 800,
                stock_quantity: 35,
                color: 'gray',
                size: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 4
            {
                id: 7,
                productId: 4,
                price: 2000,
                stock_quantity: 40,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                productId: 4,
                price: 2000,
                stock_quantity: 45,
                color: 'black',
                size: 'L',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 5
            {
                id: 9,
                productId: 5,
                price: 500,
                stock_quantity: 50,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                productId: 5,
                price: 500,
                stock_quantity: 55,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 6
            {
                id: 11,
                productId: 6,
                price: 300,
                stock_quantity: 60,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                productId: 6,
                price: 300,
                stock_quantity: 65,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 7
            {
                id: 13,
                productId: 7,
                price: 100,
                stock_quantity: 70,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                productId: 7,
                price: 100,
                stock_quantity: 75,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 8
            {
                id: 15,
                productId: 8,
                price: 150,
                stock_quantity: 80,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 16,
                productId: 8,
                price: 150,
                stock_quantity: 85,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 9
            {
                id: 17,
                productId: 9,
                price: 250,
                stock_quantity: 90,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 18,
                productId: 9,
                price: 250,
                stock_quantity: 95,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 10
            {
                id: 19,
                productId: 10,
                price: 400,
                stock_quantity: 100,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 20,
                productId: 10,
                price: 400,
                stock_quantity: 105,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 11
            {
                id: 21,
                productId: 11,
                price: 600,
                stock_quantity: 110,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 22,
                productId: 11,
                price: 600,
                stock_quantity: 115,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 12
            {
                id: 23,
                productId: 12,
                price: 700,
                stock_quantity: 120,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 24,
                productId: 12,
                price: 700,
                stock_quantity: 125,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 13
            {
                id: 25,
                productId: 13,
                price: 50,
                stock_quantity: 130,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 26,
                productId: 13,
                price: 50,
                stock_quantity: 135,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 14
            {
                id: 27,
                productId: 14,
                price: 75,
                stock_quantity: 140,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 28,
                productId: 14,
                price: 75,
                stock_quantity: 145,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 15
            {
                id: 29,
                productId: 15,
                price: 125,
                stock_quantity: 150,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 30,
                productId: 15,
                price: 125,
                stock_quantity: 155,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 16
            {
                id: 31,
                productId: 16,
                price: 175,
                stock_quantity: 160,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 32,
                productId: 16,
                price: 175,
                stock_quantity: 165,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 17
            {
                id: 33,
                productId: 17,
                price: 225,
                stock_quantity: 170,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 34,
                productId: 17,
                price: 225,
                stock_quantity: 175,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 18
            {
                id: 35,
                productId: 18,
                price: 275,
                stock_quantity: 180,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 36,
                productId: 18,
                price: 275,
                stock_quantity: 185,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 19
            {
                id: 37,
                productId: 19,
                price: 425,
                stock_quantity: 190,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 38,
                productId: 19,
                price: 425,
                stock_quantity: 195,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 20
            {
                id: 39,
                productId: 20,
                price: 625,
                stock_quantity: 200,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 40,
                productId: 20,
                price: 625,
                stock_quantity: 205,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 21
            {
                id: 41,
                productId: 21,
                price: 725,
                stock_quantity: 210,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 42,
                productId: 21,
                price: 725,
                stock_quantity: 215,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 22
            {
                id: 43,
                productId: 22,
                price: 75,
                stock_quantity: 220,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 44,
                productId: 22,
                price: 75,
                stock_quantity: 225,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 23
            {
                id: 45,
                productId: 23,
                price: 100,
                stock_quantity: 230,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 46,
                productId: 23,
                price: 100,
                stock_quantity: 235,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 24
            {
                id: 47,
                productId: 24,
                price: 150,
                stock_quantity: 240,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 48,
                productId: 24,
                price: 150,
                stock_quantity: 245,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 25
            {
                id: 49,
                productId: 25,
                price: 200,
                stock_quantity: 250,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 50,
                productId: 25,
                price: 200,
                stock_quantity: 255,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 26
            {
                id: 51,
                productId: 26,
                price: 250,
                stock_quantity: 260,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 52,
                productId: 26,
                price: 250,
                stock_quantity: 265,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 27
            {
                id: 53,
                productId: 27,
                price: 300,
                stock_quantity: 270,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 54,
                productId: 27,
                price: 300,
                stock_quantity: 275,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 28
            {
                id: 55,
                productId: 28,
                price: 350,
                stock_quantity: 280,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 56,
                productId: 28,
                price: 350,
                stock_quantity: 285,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 29
            {
                id: 57,
                productId: 29,
                price: 400,
                stock_quantity: 290,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 58,
                productId: 29,
                price: 400,
                stock_quantity: 295,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 30
            {
                id: 59,
                productId: 30,
                price: 450,
                stock_quantity: 300,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 60,
                productId: 30,
                price: 450,
                stock_quantity: 305,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 31
            {
                id: 61,
                productId: 31,
                price: 500,
                stock_quantity: 310,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 62,
                productId: 31,
                price: 500,
                stock_quantity: 315,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 32
            {
                id: 63,
                productId: 32,
                price: 550,
                stock_quantity: 320,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 64,
                productId: 32,
                price: 550,
                stock_quantity: 325,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 33
            {
                id: 65,
                productId: 33,
                price: 600,
                stock_quantity: 330,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 66,
                productId: 33,
                price: 600,
                stock_quantity: 335,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 34
            {
                id: 67,
                productId: 34,
                price: 650,
                stock_quantity: 340,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 68,
                productId: 34,
                price: 650,
                stock_quantity: 345,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 35
            {
                id: 69,
                productId: 35,
                price: 700,
                stock_quantity: 350,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 70,
                productId: 35,
                price: 700,
                stock_quantity: 355,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 36
            {
                id: 71,
                productId: 36,
                price: 750,
                stock_quantity: 360,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 72,
                productId: 36,
                price: 750,
                stock_quantity: 365,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 37
            {
                id: 73,
                productId: 37,
                price: 800,
                stock_quantity: 370,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 74,
                productId: 37,
                price: 800,
                stock_quantity: 375,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 38
            {
                id: 75,
                productId: 38,
                price: 850,
                stock_quantity: 380,
                color: 'blue',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 76,
                productId: 38,
                price: 850,
                stock_quantity: 385,
                color: 'red',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 39
            {
                id: 77,
                productId: 39,
                price: 900,
                stock_quantity: 390,
                color: 'green',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 78,
                productId: 39,
                price: 900,
                stock_quantity: 395,
                color: 'yellow',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            },
            // SKUs for Product 40
            {
                id: 79,
                productId: 40,
                price: 950,
                stock_quantity: 400,
                color: 'black',
                size: 'S',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 80,
                productId: 40,
                price: 950,
                stock_quantity: 405,
                color: 'white',
                size: 'M',
                created_at: new Date(),
                updated_at: new Date()
            }

        ]);
    },

    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('skus', null, {});
    }
};

