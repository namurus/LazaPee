'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.hasMany(models.Product, {
      foreignKey: 'shopId', 
      as: 'products', 
      });
      Shop.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',          
      });
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
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'owner_id',
        references: {
          model: 'user',
          key: 'id',
        },
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
      temporaryClosurePeriod: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'temporary_closure_period',
      },
      temporaryClosureReason: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'temporary_closure_reason',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
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
      modelName: 'Shop',
      tableName: 'shops',
      paranoid: true, 
      timestamps: true, 
    }


  );

  return Shop;
};