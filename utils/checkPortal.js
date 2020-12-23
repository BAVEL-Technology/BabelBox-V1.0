const games = require('../jsonDB/games.json')
const game = games.filter(g => g.title === 'LIAR LIAR')[0]
const { Portal, Round, User } = require('../models')

const checkPortal = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
      where: {
        code: req.params.code,
        game: game.title
      }
    })

    if (!portalData) {
      res.redirect(`/liarliar?error=${encodeURIComponent('Couldn\'t find that portal!')}`)
    } else {
      next()
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = checkPortal
