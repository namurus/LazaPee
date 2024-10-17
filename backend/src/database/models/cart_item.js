'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        getTotalPrice() {
            return this.quantity * this.price;
        }
        static associate(models) {
            CartItem.belongsTo(models.Cart, {
                foreignKey: 'cartId',
                as: 'cart',
            })
            CartItem.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product',
            })
        }
    }

    CartItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'quantity',
            },
            cartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'cart_id',
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'product_id',
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                field: 'price',
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
                field: 'updated_at',
            },
        },

        {
            sequelize,
            modelName: 'CartItem',
            tableName: 'cart_item',
            underscored: true,
        }
    )

    return CartItem
}
