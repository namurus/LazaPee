'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShopProduct extends Model {
    /**
     * Define associations here
     */
    static associate(models) {
      // Mối quan hệ với bảng Shops
      ShopProduct.belongsTo(models.Shop, {
        foreignKey: 'shopId',
        as: 'shop',
      });

      // Mối quan hệ với bảng Product
      ShopProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  ShopProduct.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'shop_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },

    },
    {
      sequelize,
      modelName: 'ShopProduct',
      tableName: 'shop_product',
      timestamps: true, // Để sử dụng createdAt và updatedAt
    }
  );

  return ShopProduct;
};