'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SkuAttribute extends Model {
        static associate(models) {
            // define association here
            SkuAttribute.belongsTo(models.Attribute, { 
                foreignKey: 'attributeId', 
                onDelete: 'CASCADE' 
            });
            SkuAttribute.belongsTo(models.Skus, { 
                foreignKey: 'skuId',
                onDelete: 'CASCADE'
            });
        }
    }

    SkuAttribute.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            attributeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Attribute',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            skuId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Skus',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false,
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
            modelName: 'SkuAttribute',
            tableName: 'sku_attribute',
        }
    );

    return SkuAttribute;
};