const sequelize = require('../config/connection');
const { Question } = require('../models');

const questionData = require('./questions.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const questions = await Question.bulkCreate(questionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
