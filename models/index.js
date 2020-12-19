const User = require('./User')
const Answer = require('./Answer')
const Portal = require('./Portal')
const Round = require('./Round')
const Question = require('./Question')

Portal.hasMany(User, {
  foreignKey: 'portal_id'
})

Portal.hasMany(Round, {
  foreignKey: 'portal_id'
})

User.belongsTo(Portal, {
  foreignKey: 'portal_id',
  onDelete: 'CASCADE'
})

User.hasMany(Answer, {
  foreignKey: 'user_id'
})

Question.hasMany(Round, {
  foreignKey: 'question_id'
})

Round.belongsTo(Portal, {
  foreignKey: 'portal_id',
  onDelete: 'CASCADE'
})

Round.belongsTo(Question, {
  foreignKey: 'question_id',
})

Round.hasMany(Answer, {
  foreignKey: 'round_id',
})

Answer.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Answer.belongsTo(Round, {
  foreignKey: 'round_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Answer, Portal, Round, Question }
