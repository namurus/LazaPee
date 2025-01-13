'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'category',
			[
				// Cửa hàng điện tử
				{
					id: 1,
					name: "Laptop",
					description: "Laptop xách tay và nhiều loại laptop khác",
					parent_id: null,
					thumbnail: "https://bom.so/7BzqId",

				},
				{
					id: 2,
					name: "Dell",
					description: "Laptop Dell chính hãng",
					parent_id: 1,
					thumbnail: "https://bom.so/81NdfT",
				},
				{
					id: 3,
					name: "Macbook",
					description: "Macbook chính hãng",
					parent_id: 1,
					thumbnail: "https://bom.so/8JEHaW",
				},
				{
					id: 4,
					name: "Smartphone",
					description: "cửa hàng chúng tôi cung cấp đa dạng các dòng smartphone từ các thương hiệu hàng đầu như Apple, Samsung,... ",
					thumbnail: "https://bom.so/qhfThX",
				},
				{
					id: 5,
					name:"Apple",
					description: "Đa dạng sản phẩm của Apple",
					parent_id: 4,
					thumbnail: "https://bom.so/pbVH76",
				},
				{
					id: 6,
					name: "Samsung",
					description: "Đa dạng sản phẩm của Samsung",
					parent_id: 4,
					thumbnail: "https://bom.so/TZV5Ac",
				},

				// Cửa hàng quần áo 
				{
					id: 7,
					name: "Quần áo nam",
					description: " Quần áo nam thương hiệu đa dạng mẫu mã",
					parent_id: null,
					thumbnail: "",
				},
				{
					id: 8,
					name: "Quần áo nữ",
					description: "Quần áo nữ thương hiệu đa dạng mẫu mã",
					parent_id: null,
					thumbnail: "",
				},
				// Cửa hàng thú cưng
				{
					id: 9,
					name: "Thức ăn cho thú cưng",
					description: "các loại thức ăn cho thú cưng đa dạng, chất lượng",
					parent_id: null,
					thumbnail: "",
				},
				{
					id: 10,
					name: "Phụ kiện thú cưng",
					description: "Phụ kiên cho chó đa dạng, chất lượng",
					parent_id: null,
					thumbnail: "",
				},
				{
					id: 11,
					name: "Đồ chơi cho thú cưng",
					description: "Đồ chơi cho thú cưng đa dạng như đồ chơi nhai cho chó, đồ chơi lăn cho mèo,...",
					parent_id: 10,
					thumbnail: "",
				},
				{
					id: 12,
					name: "Dụng cụ ăn uống cho thú cưng",
					description: "Dụng cụ ăn uống cho thú cưng đa dạng các loại như: bát ăn, bình nước, thảm ăn",
					parent_id: 10,
				},
				{
					id: 13,
					name: "Sản phẩm vệ sinh cho thú cưng",
					description: "Sản phẩm vệ sinh cho thú cưng đa dạng các loại như: nước tắm, bột tắm, bàn chải, cát cho mèo,...",
					thumbnail: "",
				}


			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	},
};
