'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'customerId',
        as: 'customer',
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'OrderItems',
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       field: 'id',
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'customer_id',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        field: 'status',
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number',
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'shipping_address',
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_amount',
      },
      orderNote: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'order_note',
      },
      shippingCompany: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'shipping_company',
      },
      shippingFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'shipping_fee',
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
      paranoid: true,
      modelName: 'Order',
      tableName: 'order',
    }
  );

  return Order;
};
