const router = require('express').Router()
const { Portal } = require('../models')

router.get('/', async (req, res) => {
  try {
    res.render('homepage')

  } catch (err) {

    console.log(err)
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
