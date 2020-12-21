const sequelize = require('../config/connection');
const { Question } = require('../models');

const questionData = require('./questions.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const questions = await Question.bulkCreate(questionData.normal, {
      ignoreDuplicates: true
    });

    process.exit(0);
  } catch (err) {
    console.log(err)
  }
};

seedDatabase();
