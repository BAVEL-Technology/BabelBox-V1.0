const router = require('express').Router()
const { Portal, User, Round } = require('../models')

router.get('/', async (req, res) => {
  try {
    const games = [
      {
        title: "LIAR LIAR",
        font: "'Nerko One', cursive",
        color: "yellow-400"
      },
      {
        title: "JEPARDY",
        font: "'Nerko One', cursive",
        color: "purple-400"
      }
    ]
    res.render('games', {
      games
    })

  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

router.get('/fibbage', async (req, res) => {
  try {

    res.render('fibbage')

  } catch (err) {

    res.status(500).json(err)

  }
})

router.get('/fibbage/:code', async (req, res) => {
  try {
    const portalData = await Project.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: { code: req.params.code }
    })

    if(!portalData) {
      res.render('')
    }

    res.render('fibbage', {
      portalData
    })

  } catch (err) {

    res.status(500).json(err)

  }
})

router.get('/liarliar/lobby/:code', async (req, res) => {
  try {
    const portal = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: { code: req.params.code }
    })

    res.render("lobby", {portal})
  } catch (err) {

    console.log(err)
    res.status(500).json(err)

  }
})

module.exports = router
