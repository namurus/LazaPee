'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ShippingCompany extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
  ShippingCompany.init(
    {
      shippingCompanyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'shippingCompanyId',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'thumbnail',
      },
    },
    {
      sequelize,
      modelName: 'ShippingCompany',
      tableName: 'shipping_company',
      underscored: true,
      timestamps: false,
    }
  );
  return ShippingCompany;
};