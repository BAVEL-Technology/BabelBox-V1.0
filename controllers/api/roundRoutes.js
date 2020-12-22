const router = require('express').Router()
const { Round, Portal, Question, User, Answer } = require('../../models')

/**
* Create a round inside given portal
* @param  {body: round, question_id, portal_id}
* @return {id, round, Question, Portal}
*/
router.post('/', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      where: { id: req.body.portal_id }
    })

    if(!portalData) {
        res.json({ message: 'Could not find that portal!' })
    }

    const questionData = await Question.findOne({
      where: { id: Math.floor(Math.random() * 282) }
    })

    if(!questionData) {
        res.json({ message: 'Could not find that question!' })
    }

    const roundData = await Round.create({
      portal_id: req.body.portal_id,
      round: req.body.round,
      question_id: questionData.dataValues.id
    }, {
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round']
    })

    const answerData = await Answer.create({
        answer: questionData.dataValues.answer,
        round_id: roundData.dataValues.id
    })

    res.json(roundData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Find a round with given id
* @param  {id}
* @return {id, round, Question, Portal}
*/
router.get('/:id', async (req, res) => {
  try {
    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: { id: req.params.id }
    })

    if (!roundData) {
      res.status(400).json({ message: 'Could not find that round!' })
      return
    }

    res.json(roundData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Update a rounds question
* @param  {id}
* @param  {body: question_id}
* @return {id, round, Question, Portal}
*/
router.put('/:id', async (req, res) => {
  try {
    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: { portal_id: req.body.portal_id }
    })

    if (!roundData) {
      res.status(400).json({ message: 'Could not find that round!' })
      return
    }

    const questionData = await Question.findOne({
      where: { id: req.body.question_id }
    })

    if(!questionData) {
        res.json({ message: 'Could not find that question!' })
    }

    roundData = await roundData.update({
      question_id: req.body.question_id
    })

    res.json(roundData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Delete a round
* @param  {id}
* @return {Round}
*/
router.delete('/:id', async (req, res) => {
  try {
    const roundData = await Round.destroy({
      where: { id: req.body.id }
    })

    if (!roundData) {
      res.status(404).json({ message: 'Could not find that round!' })
      return
    }

    res.status(200).json(roundData)

  } catch (err) {

    res.status(500).json(err)

  }
})

module.exports = router
