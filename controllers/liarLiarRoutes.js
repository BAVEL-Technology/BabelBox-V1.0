const router = require('express').Router();
const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, User, Round, Question, Answer } = require('../models');
const checkPhase = require('../utils/checkPhase');
const checkPortal = require('../utils/checkPortal');
const matchUserToPortal = require('../utils/matchUserToPortal');
const checkWhenUserJoinedPortal = require('../utils/checkWhenUserJoinedPortal');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
/**
 * Prompt user to create new portal or join current portal with code
 * @param  {}
 * @return {game}
 */
router.get('/', async (req, res) => {
  try {
    res.render('liarliar/game', {
      game,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Waiting, Question or Answer phase
 * Check to make sure the portals current phase is the
 * same as the req.params.phase
 * @param  {code, phase}
 * @return {game, portal, portalLeader, currentUser, loggedIn, round, answers}
 */
router.get(
  '/:code/waiting/hard',
  checkPortal,
  matchUserToPortal,
  async (req, res) => {
    try {
      const portalData = await Portal.findOne({
        include: [
          {
            model: Round,
            required: false,
            order: [['id', 'ASC']],
            include: [
              { model: Question },
              {
                model: Answer,
                order: [['answer', 'DESC']]
              }
            ]
          },
          {
            model: User,
            required: false,
            where: { id: { [Op.not]: req.session.user }, }
          }
        ],
        attributes: ['id', 'code', 'round', 'phase'],
        where: {
          code: req.params.code,
          game: game.title,
        },
      });

      let portal;

      if (portalData) {
        portal = portalData.get({ plain: true });
      }

      console.log(portal);

      let currentUserData;

      if (req.session.user) {
        currentUserData = await User.findOne({
          include: [{
            model: Answer,
            required: false,
            where: { round_id: portal.rounds.length > 0 ? portal.rounds[0].id : 0}
          }],
          attributes: ['id', 'name', 'leader', 'avatar', 'points', 'answer_lock', 'question_lock'],
          where: {
            id: req.session.user,
            // eslint-disable-next-line camelcase
            portal_id: portal.id,
          },
        });
      }

      let currentUser;

      if (currentUserData) {
        currentUser = currentUserData.get({ plain: true });
      }

      res.render('liarliar/waiting', {
        portal,
        game,
        currentUser,
        loggedIn: req.session.user ? true : false,
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.redirect(
        `/liarliar?error=${encodeURIComponent(err)}`
      );
    }
  }
);

/**
 * Waiting, Question or Answer phase
 * Check to make sure the portals current phase is the
 * same as the req.params.phase
 * @param  {code, phase}
 * @return {game, portal, portalLeader, currentUser, loggedIn, round, answers}
 */
router.get(
  '/:code/:phase',
  checkPortal,
  checkWhenUserJoinedPortal,
  checkPhase,
  matchUserToPortal,
  async (req, res) => {
    try {
      const portalData = await Portal.findOne({
        include: [
          {
            model: Round,
            required: false,
            order: [['id', 'DESC']],
            include: [
              { model: Question },
              {
                model: Answer,
                order: [['answer', 'DESC']]
              }
            ]
          },
          {
            model: User,
            required: false,
            where: { id: { [Op.not]: req.session.user }, }
          }
        ],
        attributes: ['id', 'code', 'round', 'phase'],
        where: {
          code: req.params.code,
          game: game.title,
        },
      });

      let portal;

      if (portalData) {
        portal = portalData.get({ plain: true });
      }

      console.log(portal);

      const roundData = await Round.findOne({
        include: [{ model: Question }, { model: Answer }],
        where: {
          portal_id: portal.id,
          round: portal.round
        }
      });

      let round;

      if (roundData) {
        round = roundData.get({ plain: true });
      }
      console.log(round);
      let currentUserData;

      if (req.session.user) {
        currentUserData = await User.findOne({
          include: [{
            model: Answer,
            required: false,
            where: { round_id: portal.rounds.length > 0 ? portal.rounds[0].id : 0}
          }],
          attributes: ['id', 'name', 'leader', 'avatar', 'points', 'answer_lock', 'question_lock'],
          where: {
            id: req.session.user,
            // eslint-disable-next-line camelcase
            portal_id: portal.id,
          },
        });
      }

      let currentUser;

      if (currentUserData) {
        currentUser = currentUserData.get({ plain: true });
      }

      console.log(currentUser);

      res.render(`liarliar/${req.params.phase}`, {
        portal,
        game,
        currentUser,
        round,
        loggedIn: req.session.user ? true : false,
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.redirect(
        `/liarliar?error=${encodeURIComponent(err)}`
      );
    }
  }
);

module.exports = router;
