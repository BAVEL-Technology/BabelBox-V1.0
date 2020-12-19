const router = require('express').Router()
const { Round, Portal, Question } = require('../../models')

/**
* Find all rounds inside given portal
* @param  {body: portal_id}
* @return {id, round, question_id, portal_id}
*/
router.get('/', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      where: { id: req.body.portal_id }
    })

    if(!portalData) {
        res.json({ message: 'Could not find that portal!' })
    }

    const roundData = await Round.findAll({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: { portal_id: req.body.portal_id }
    })

    res.json({ rounds: roundData })

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Create a round inside given portal
* @param  {body: round, question_id, portal_id}
* @return {id, round, question_id, portal_id}
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
      where: { id: req.body.question_id }
    })

    if(!questionData) {
        res.json({ message: 'Could not find that question!' })
    }

    const roundData = await Round.create(req.body, {
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round']
    })

    res.json(roundData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Find a round with given id
* @param  {id}
* @return {id, round, question_id, portal_id}
*/
router.get('/:id', async (req, res) => {
  try {
    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: { id: req.body.id }
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
* @return {id, round, question_id, portal_id}
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
* @return {id, round, question_id, portal_id}
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
