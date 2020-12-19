const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Portal extends Model {}

Portal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    game: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'portal'
  }
);

module.exports = Portal;
