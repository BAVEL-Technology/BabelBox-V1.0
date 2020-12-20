const router = require('express').Router()
const { Portal, User, Round } = require('../models')
const withAuth = require('../utils/auth');

const games = [
  {
    title: "LIAR LIAR",
    font: "'Sniglet', cursive",
    color: "yellow-500",
    url: "liar",
    tagline: "The game where knowing the right answer, is only half the challenge"
  },
  {
    title: "JEPARDY",
    font: "'Nerko One', cursive",
    color: "purple-400",
    url: ""
  }
]

router.get('/', async (req, res) => {
  try {
    res.render('hero', {
      games
    })

  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/:game', async (req, res) => {
  try {

    const game = games.filter(g => g.url === req.params.game)[0]
    console.log(game)
    res.render('game', {
      game
    })

  } catch (err) {

    res.status(500).json(err)

  }
})

router.get('/:game/:code', async (req, res) => {
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

    const portalLeaderData = await User.findOne({
      attributes: ['id', 'name', 'leader'],
      where: {
        leader: 1,
        portal_id: portal.id
      }
    })

    const portalLeader = portalLeaderData.get({ plain: true })

    res.render("lobby", {
      portal,
      game,
      portalLeader,
      currentUser: req.session.user,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/:game/:code/question/:round', async (req, res) => {
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

    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: {
        id: req.params.round,
        portal_id: portal.id
      }
    })

    const round = roundData.get({ plain: true })

    res.render("question", {
      portal,
      game,
      round,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/:game/:code/answer/:round', async (req, res) => {
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

    const roundData = await Round.findOne({
      include: [
        { model: Question },
        { model: Portal }
      ],
      attributes: ['id', 'round'],
      where: {
        id: req.params.round,
        portal_id: portal.id
      }
    })

    const round = roundData.get({ plain: true })

    res.render("question", {
      portal,
      game,
      round,
      loggedIn: req.session.portal === portal.id ? true : false
    })
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

module.exports = router
