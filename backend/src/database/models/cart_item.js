'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        getTotal() {
            return this.quantity * (this.skus ? this.skus.price : 0);
        }
        getDiscountedTotal() { 
            if (!this.discountPercentage) {
                return this.getTotal();
            }
            return this.getTotal() - (this.getTotal() * this.discountPercentage / 100);
        }
        static associate(models) {
            CartItem.belongsTo(models.Cart, {
                foreignKey: 'cartId',
                as: 'cart',
            })
            CartItem.belongsTo(models.Skus, {
                foreignKey: 'skusId',
                as: 'skus',
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
            skusId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'skus_id',
            },
            price: {
                type: DataTypes.DECIMAL(10, 3),
                allowNull: false,
                field: 'price',
            },
            discountPercentage: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
                field: 'discount_percentage',
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
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
                field: 'deleted_at',
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
