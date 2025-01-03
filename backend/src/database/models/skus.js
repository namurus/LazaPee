'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Skus extends Model {
        static associate(models) {
            Skus.belongsTo(models.Product, {
                foreignKey: 'productId',
                onDelete: 'CASCADE',
            });

        }
    }

    Skus.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Product',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            price: {
                type: DataTypes.DECIMAL(10, 0),
                allowNull: false,
            },
            stock_quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Skus',
            tableName: 'skus',
            timestamps: false,
        }
    );

    return Skus;
};