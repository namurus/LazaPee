'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init(
    {
      shopId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'shop_id',
      },
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'shop_name',
      },
      revenue: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'revenue',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'status',
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'creation_date',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'location',
      },
      reviewRating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'review_rating',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      productNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'product_number',
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
      modelName: 'Shop',
      tableName: 'shops',
      paranoid: true, 
      timestamps: true, 
    }


  );

  return Shop;
};