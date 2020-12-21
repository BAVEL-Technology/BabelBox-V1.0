const games = require('../jsonDB/games.json')
const game = games.filter(g => g.title === 'LIAR LIAR')[0]
const { Portal, Round, User } = require('../models')

const checkPhase = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round', 'phase'],
      where: {
        code: req.params.code,
        game: game.title
      }
    })

    const portal = portalData.get({ plain: true })
    console.log(portal)
    if (portal.phase != req.params.phase) {
      res.redirect(`/liarliar/${portal.code}/${portal.phase}`)
    } else {
      next()
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = checkPhase
