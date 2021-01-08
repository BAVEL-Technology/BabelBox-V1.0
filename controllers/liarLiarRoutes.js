const router = require('express').Router();
const games = require('../jsonDB/games.json');
const game = games.filter((g) => g.title === 'LIAR LIAR')[0];
const { Portal, User, Round, Question, Answer } = require('../models');
const checkPhase = require('../utils/checkPhase');
const checkPortal = require('../utils/checkPortal');
const matchUserToPortal = require('../utils/matchUserToPortal');
<<<<<<< HEAD
const { Op } = require('sequelize');

=======
const checkWhenUserJoinedPortal = require('../utils/checkWhenUserJoinedPortal');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
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
<<<<<<< HEAD
=======
    console.log(err);
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
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
<<<<<<< HEAD
  '/:code/:phase',
  checkPortal,
  checkPhase,
=======
  '/:code/waiting/hard',
  checkPortal,
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
  matchUserToPortal,
  async (req, res) => {
    try {
      const portalData = await Portal.findOne({
<<<<<<< HEAD
        include: [{ model: Round }, { model: User }],
=======
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
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
        attributes: ['id', 'code', 'round', 'phase'],
        where: {
          code: req.params.code,
          game: game.title,
        },
      });
<<<<<<< HEAD

      const portal = portalData.get({ plain: true });

      let round;

      if (portal.phase === 'question' || portal.phase === 'answer') {
        const roundData = await Round.findOne({
          include: [{ model: Question }, { model: Portal }],
          attributes: ['id', 'round', 'question_start_time', 'answer_start_time'],
          where: {
            id: portal.rounds.filter((r) => r.round === portal.round)[0].id,
            // eslint-disable-next-line camelcase
            portal_id: portal.id,
          },
        });

        round = roundData.get({ plain: true });
      }

      const portalLeaderData = await User.findOne({
        attributes: ['id', 'name', 'leader', 'avatar', 'points'],
        where: {
          leader: 1,
          // eslint-disable-next-line camelcase
          portal_id: portal.id,
        },
      });

      let currentUser;
      let users;
      let portalLeader = false;

      if (req.session.user) {
        const currentUserData = await User.findOne({
          include: [{
            model: Answer,
            attributes: ['round_id', 'answer']
          }],
          attributes: ['id', 'name', 'leader', 'avatar', 'points', 'answer_lock', 'question_lock'],
          where: {
            id: req.session.user,
            // eslint-disable-next-line camelcase
            portal_id: portal.id,
          },
        });

        currentUser = currentUserData.get({ plain: true });

        // currentUser.answers.filter((a) => a.round_id === round.id)


        const userData = await User.findAll({
          include: [{ model: Portal }],
          attributes: ['id', 'name', 'leader', 'points', 'avatar'],
          where: {
            id: { [Op.not]: currentUser.id },
            // eslint-disable-next-line camelcase
            portal_id: portal.id,
          },
          order: [['points', 'DESC']],
        });

        users = userData.map((u) => u.get({ plain: true }));

        portalLeader =
          portalLeaderData.dataValues.id === req.session.user ? true : false;
      }

      let answers;

      if (req.params.phase === 'answer') {
        const answerData = await Answer.findAll({
          include: [{ model: Round }, { model: User }],
          attributes: ['id', 'answer'],
          where: {
            // eslint-disable-next-line camelcase
            round_id: round.id,
          },
          order: [['answer', 'DESC']],
        });

        answers = answerData.map((a) => a.get({ plain: true }));
      }

      res.render(`liarliar/${req.params.phase}`, {
        portal,
        game,
        round,
        portalLeader,
        currentUser,
        users,
        answers,
        loggedIn: req.session.user ? true : false,
      });
    } catch (err) {
      res.status(500).json(err);
=======

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

      console.log(round);

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
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
    }
  }
);

module.exports = router;
