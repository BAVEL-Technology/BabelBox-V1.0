const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, Round, User } = require('../models');
const { Op } = require('sequelize');

const checkPhase = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
      include: [{
        model: Round,
        required: false,
        attributes: ['id', 'round', 'created_at'],
        where: {
          round: {[Op.col]: 'Portal.round'}
        }
      }, { model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
      where: {
        code: req.params.code,
        game: game.title,
      },
    });

    const portal = portalData.get({ plain: true });

    if (portal.phase !== req.params.phase) {
      console.log('redirecting to phase')
      res.redirect(`/liarliar/${portal.code}/${portal.phase}`);
    } else {
      console.log('next checkPhase')
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkPhase;
