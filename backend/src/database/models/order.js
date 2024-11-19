'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    getTotal()
    {
      let total = 0;
      for (const item of this.OrderItems) {
        total += item.getTotal();
      }
      return total;
    }
    getDiscountedTotal()
    {
      let discountedTotal = 0;
      for (const item of this.OrderItems) {
        discountedTotal += item.getDiscountedTotal();
      }
      return discountedTotal;
    }
    getTotalProducts()
    {
      return this.OrderItems.length;
    }

    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
      Cart.hasMany(models.CartItem, {
        foreignKey: 'OrderId',
        as: 'OrderItems',
        })
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    status: {
      type: DataTypes.STRING
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
  }, {
    sequelize,
			paranoid: true,
      modelName: 'Order',
      tableName: 'order',
  });
  return Order;
};