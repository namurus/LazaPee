'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
        // define association here
      }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'customer_id',
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'amount',
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'payment_method',
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'order_id',
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description',
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
        field: 'status',
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
      modelName: 'Payment',
      tableName: 'payements', // Tên bảng trong database
      timestamps: true, // Bật timestamps cho createdAt và updatedAt
      paranoid: true, // Bật soft delete (sử dụng deletedAt)
    }
  );

  return Payment;
};
