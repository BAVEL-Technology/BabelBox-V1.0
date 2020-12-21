const { Portal } = require('../models')

const correctPhase = (req, res, next) => {
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

  if (portal.phase != req.params.phase) {
    res.redirect(`/liarliar/${portal.code}`)
  } else {

  }
}

module.exports = correctPhase
