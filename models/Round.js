const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Round extends Model {}

Round.init(
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
    question_start_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer_start_time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    portal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'portal',
        key: 'id',
        unique: false
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'question',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'round'
  }
);

module.exports = Round;
