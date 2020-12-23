const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, Round, User } = require('../models');

const matchUserToPortal = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
      where: {
        code: req.params.code,
        game: game.title,
      },
    });

    const portal = portalData.get({ plain: true });

    const users = portal.users.map((u) => u.id);

    if (users.includes(req.session.user)) {
      next();
    } else {
      req.session.save(() => {
        req.session.user = null;
      });
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchUserToPortal;
