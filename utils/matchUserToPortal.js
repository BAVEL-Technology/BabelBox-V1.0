<<<<<<< HEAD
const games = require("../jsonDB/games.json");
const game = games.filter((g) => g.title === "LIAR LIAR")[0];
const { Portal, Round, User } = require("../models");
=======
const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, Round, User } = require('../models');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e

const matchUserToPortal = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
<<<<<<< HEAD
      include: [{ model: Round }, { model: User }],
      attributes: ["id", "code", "round", "phase"],
=======
      include: [{ model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
      where: {
        code: req.params.code,
        game: game.title,
      },
    });

    const portal = portalData.get({ plain: true });

    const users = portal.users.map((u) => u.id);

    if (users.includes(req.session.user)) {
<<<<<<< HEAD
=======
      console.log('next matchUser');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
      next();
    } else {
      req.session.save(() => {
        req.session.user = null;
      });
<<<<<<< HEAD
=======
      console.log('next matchUser');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchUserToPortal;
