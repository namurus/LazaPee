'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetails.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  UserDetails.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name',
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone',
      },
      address: {
        type: DataTypes.STRING,
        field: 'address',
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
      modelName: 'UserAddress',
      tableName: 'user_address',
    }
  );

  return UserDetails;
};
