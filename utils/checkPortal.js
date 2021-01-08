<<<<<<< HEAD
const games = require("../jsonDB/games.json");
const game = games.filter((g) => g.title === "LIAR LIAR")[0];
const { Portal } = require("../models");
=======
const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, User } = require('../models');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e

const checkPortal = async (req, res, next) => {
  try {
    const portalData = await Portal.findOne({
      include: [{ model: User }],
      where: {
        code: req.params.code,
        game: game.title,
      },
    });

    if (!portalData) {
      res.redirect(
<<<<<<< HEAD
        `/liarliar?error=${encodeURIComponent("Couldn't find that portal!")}`
=======
        `/liarliar?error=${encodeURIComponent('Couldn\'t find that portal!')}`
      );
    } else if (portalData.dataValues.users.length < 1) {
      res.redirect(
        `/liarliar?error=${encodeURIComponent('Something went wrong!')}`
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
      );
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkPortal;
