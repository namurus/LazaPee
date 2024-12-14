'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attribute extends Model {
        static associate(models) {
            // define association here
            Attribute.hasMany(models.SkuAttribute, {
                foreignKey: 'attributeId',
                onDelete: 'CASCADE',
            });
        }
    }

    Attribute.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
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
            modelName: 'Attribute',
            tableName: 'attribute',
        }
    );

    return Attribute;
};