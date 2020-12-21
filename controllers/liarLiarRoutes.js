const router = require('express').Router()
const games = require('../jsonDB/games.json')
const game = games.filter(g => g.title === 'LIAR LIAR')[0]
const { Portal, User, Round, Question, Answer } = require('../models')
const correctPhase = require('../utils/correctPhase');

router.get('/', async (req, res) => {
  try {
    res.render('liarliar/game', {
      game
    })

  } catch (err) {

    res.status(500).json(err)

  }
})

router.get('/:code', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: {
        code: req.params.code,
        game: game.title
      }
    })

    const portal = portalData.get({ plain: true })

    const portalLeaderData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar'],
      where: {
        leader: 1,
        portal_id: portal.id
      }
    })

    const currentUserData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar', 'points'],
      where: {
        id: req.session.user,
        portal_id: portal.id
      }
    })

    const currentUser = currentUserData.get({ plain: true })

    const portalLeader = portalLeaderData.dataValues.id === req.session.user ? true : false

    res.render("lobby", {
      portal,
      game,
      portalLeader,
      currentUser,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/:game/:code/question', async (req, res) => {
  try {
    const game = games.filter(g => g.url === req.params.game)[0]

    const portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: {
        code: req.params.code,
        game: game.title
      }
    })

    const portal = portalData.get({ plain: true })

    const roundId = portal.rounds.filter(r => r.round === portal.round)[0].id

    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: {
        id: roundId,
        portal_id: portal.id
      }
    })

    const round = roundData.get({ plain: true })

    const portalLeaderData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar'],
      where: {
        leader: 1,
        portal_id: portal.id
      }
    })

    const currentUserData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar', 'points'],
      where: {
        id: req.session.user,
        portal_id: portal.id
      }
    })

    const currentUser = currentUserData.get({ plain: true })

    const portalLeader = portalLeaderData.dataValues.id === req.session.user ? true : false

    res.render("question", {
      portal,
      game,
      round,
      portalLeader,
      currentUser,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/:game/:code/answer', async (req, res) => {
  try {
    const game = games.filter(g => g.url === req.params.game)[0]
    console.log(game)
    const portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round', 'game'],
      where: {
        code: req.params.code,
        game: game.title
      }
    })
    console.log(portalData)

    const portal = portalData.get({ plain: true })

    const roundId = portal.rounds.filter(r => r.round === portal.round)[0].id
console.log(roundId)
    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: {
        id: roundId,
        portal_id: portal.id
      }
    })
console.log(roundData)
    const round = roundData.get({ plain: true })

    const answerData = await Answer.findAll({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'answer'],
      where: {
        round_id: round.id
      }
    })

    const answers = answerData.map(a => a.get({ plain: true }))

    console.log(answers)
    const portalLeaderData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar'],
      where: {
        leader: 1,
        portal_id: portal.id
      }
    })

    const currentUserData = await User.findOne({
      attributes: ['id', 'name', 'leader', 'avatar', 'points'],
      where: {
        id: req.session.user,
        portal_id: portal.id
      }
    })
    console.log(currentUserData)
    const currentUser = currentUserData.get({ plain: true })

    const portalLeader = portalLeaderData.dataValues.id === req.session.user ? true : false
    console.log(portalLeader)
    res.render("answer", {
      portal,
      game,
      round,
      portalLeader,
      currentUser,
      answers,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

module.exports = router
