'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'brand',
      },
      image: {
        type: DataTypes.STRING,
        field: 'image',
      },
      price: {
        type: DataTypes.DECIMAL, // Use DECIMAL for currency, may change to FLOAT in future
        allowNull: false,
        field: 'price',
      },
      stock: {
        type: DataTypes.INTEGER,
        field: 'stock',
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      status: {
        type: DataTypes.ENUM('available', 'out of stock'),
        field: 'status',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Product',
      tableName: 'product',
    }
  );


  return Product;
};
