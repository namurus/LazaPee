// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Category extends Model {
//     static associate(models) {
//       Category.hasMany(models.Category, {
//         foreignKey: 'parentId',
//         as: 'subcategories',
//       });
//       Category.belongsTo(models.Category, {
//         foreignKey: 'parentId',
//         as: 'parentCategory',
//       });
//     }
//   }

//   Category.init(
//     {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       parentId: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'Categories',
//           key: 'id',
//         },
//         field: 'parent_id',
//       },
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         field: 'created_at',
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         field: 'updated_at',
//         defaultValue: DataTypes.NOW,
//       },
//       deletedAt: {
//         allowNull: true,
//         type: DataTypes.DATE,
//         field: 'deleted_at',
//       },

//     },
//     {
//       sequelize,
//       paranoid: true,
//       modelName: 'Category',
//       tableName: 'categories',
//     }
//   );

//   return Category;
// };

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        foreignKey: 'parentId',
        as: 'subcategories',
      });
      Category.belongsTo(models.Category, {
        foreignKey: 'parentId',
        as: 'parentCategory',
      });
    }
  }

  Category.init(
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
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
        field: 'parent_id',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
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
      modelName: 'Category',
      tableName: 'categories',
    }
  );

  return Category;
};