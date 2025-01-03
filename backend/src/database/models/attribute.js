'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attribute extends Model {
        static associate(models) {
            // define association here
            Attribute.hasMany(models.Skus, {
                foreignKey: 'attributeName',
                onDelete: 'CASCADE',
                as: 'skus'
            });
        }
    }

    Attribute.init(
        {
            name: {
                type: DataTypes.STRING,
                primaryKey: true,
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