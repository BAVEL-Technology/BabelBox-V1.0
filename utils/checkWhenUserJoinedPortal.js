const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, Round, User } = require('../models');
const { Op } = require('sequelize');

const checkWhenUserJoinedPortal = async (req, res, next) => {
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

    let userData;
    let user;

    if (req.session.user) {
      userData = await User.findOne({
        where: { id: req.session.user },
        attributes: ['id', 'created_at']
      });

      user = userData.get({ plain: true });
      console.log(user.created_at);
    }


    const portal = portalData.get({ plain: true });
    if (portal.rounds.length > 0 && user) {
      if (user.created_at > portal.rounds[0].created_at) {
        console.log('redirecting to waiting HARD');
        res.redirect(`/liarliar/${portal.code}/waiting/hard`);
      } else {
        console.log('next checkWhen');
        next();
      }
      console.log(user.created_at > portal.rounds[0].created_at);
    } else {
      if (!user) {
        console.log('redirecting to waiting HARD');
        res.redirect(`/liarliar/${portal.code}/waiting/hard`);
      } else {
        console.log('next checkWhen');
        next();
      }
    }

  } catch (error) {
    console.log(error);
  }
};

module.exports = checkWhenUserJoinedPortal;
