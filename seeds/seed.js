const sequelize = require('../config/connection')
const { Question, Portal } = require('../models')
const questionData = require('./questions.json')
const { Op } = require("sequelize");

const questions = async () => {
  try {

    await Question.destroy({where: { }, force: true})

    const seededQuestions = await Question.bulkCreate(questionData.normal, {
      ignoreDuplicates: true
    })

    process.exit(0)

  } catch (err) {

    console.log(err)

  }
}

module.exports = {
  questions: questions
}
