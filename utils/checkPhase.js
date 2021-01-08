const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, Round, User } = require('../models');
<<<<<<< HEAD
=======
const { Op } = require('sequelize');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e

const checkPhase = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
<<<<<<< HEAD
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
      where: {
        code: req.params.code,
        game: game.title,
      },
=======
      attributes: ['phase', 'code'],
      where: {
        code: req.params.code,
        game: game.title,
      }
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
    });

    const portal = portalData.get({ plain: true });

    if (portal.phase !== req.params.phase) {
<<<<<<< HEAD
      res.redirect(`/liarliar/${portal.code}/${portal.phase}`);
    } else {
=======
      console.log('redirecting to phase ' + portal.phase);
      res.redirect(`/liarliar/${portal.code}/${portal.phase}`);
    } else {
      console.log('next checkPhase');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkPhase;
