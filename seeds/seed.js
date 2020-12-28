// const sequelize = require('../config/connection');
const { Question } = require('../models');
const questionData = require('./questions.json');
// const { Op } = require('sequelize');

const questions = async () => {
  try {
    await Question.destroy({ where: {}, force: true });

    await Question.bulkCreate(questionData.normal, {
      ignoreDuplicates: true,
    });

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

questions();
