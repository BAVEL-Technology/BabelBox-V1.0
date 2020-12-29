const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leader: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer_lock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    portal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'portal',
        key: 'id',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
