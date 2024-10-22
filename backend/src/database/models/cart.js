'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    getTotal()
    {
      let total = 0;
      for (const item of this.cartItems) {
        total += item.getTotal();
      }
      return total;
    }
    getDiscountedTotal()
    {
      let discountedTotal = 0;
      for (const item of this.cartItems) {
        discountedTotal += item.getDiscountedTotal();
      }
      return discountedTotal;
    }
    getTotalProducts()
    {
      return this.cartItems.length;
    }
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cartId',
        as: 'cartItems',
        })
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },

    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'cart',
      underscored: true,
    }
  )

  return Cart
}