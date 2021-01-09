const router = require('express').Router();
const getAvatar = require('../../utils/getAvatar');
const { User, Portal } = require('../../models');

/**
 * Find all users inside given portal
 * @param  {body: portal_id}
 * @return {id, name, points, avatar, leader, Portal}
 */
router.get('/', async (req, res) => {
  try {
    const portal = await Portal.findOne({
      include: [{ model: Portal }],
      attributes: ['id', 'name', 'points', 'avatar', 'leader'],
      where: { id: req.body.portal_id },
    });

    if (!portal) {
      res.json({ message: 'Could not find that portal!' });
    }

    const userData = await portal.getUsers();

    res.json({ users: userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Create a user inside given portal
 * @param  {body: name, portal_id}
 * @return {id, name, points, leader, avatar, Portal}
 */
router.post('/', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      include: [{ model: User }],
      where: { id: req.body.portal_id },
    });

    if (!portalData) {
      res.json({ message: 'Could not find that portal!' });
    }

    let leader = 0;

    if (portalData.dataValues.users.length === 0) {
      leader = 1;
    }

    const userData = await User.create(
      {
        name: req.body.name,
        // eslint-disable-next-line camelcase
        portal_id: req.body.portal_id,
        avatar: getAvatar(),
        leader,
      },
      {
        include: [{ model: Portal }],
        attributes: ['id', 'name', 'points', 'leader', 'avatar'],
      }
    );

    const io = req.app.get('socketio');
    io.emit('new user', userData);

    req.session.save(() => {
      req.session.user = userData.dataValues.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/**
 * Find a user given the id
 * @param  {id}
 * @return {id, name, points, leader, avatar, Portal}
 */
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      include: [{ model: Portal }],
      attributes: ['id', 'name', 'points', 'leader', 'avatar'],
      where: { id: req.params.id },
    });

    if (!userData) {
      res.status(400).json({ message: 'Could not find that user!' });
      return;
    }

    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Find a user given the id
 * @param  {id}
 * @param  {body: name, points, leader}
 * @return {id, name, points, leader, avatar, Portal}
 */
router.put('/:id', async (req, res) => {
  try {
    let userData = await User.findOne({
      include: [{ model: Portal }],
      attributes: ['id', 'name', 'points', 'leader', 'avatar'],
      where: { id: req.params.id },
    });

    if (!userData) {
      res.status(400).json({ message: 'Could not find that user!' });
      return;
    }

    if (req.body.name) {
      userData = await userData.update({
        name: req.body.name,
      });
    }

    if (req.body.points) {
      userData = await userData.update({
        points: req.body.points,
      });
    }

    if (req.body.leader) {
      userData = await userData.update({
        leader: req.body.leader,
      });
    }

    if(req.body.answer_lock){
      userData = await userData.update({
        answer_lock: req.body.answer_lock,
      });
    }

    if(req.body.question_lock){
      userData = await userData.update({
        question_lock: req.body.question_lock,
      });
    }

    if(req.body.avatar){
      userData = await userData.update({
        avatar: req.body.avatar,
      });
    }

    const io = req.app.get('socketio');
    io.emit('updated user', userData);

    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Logout of given user name
 * @param  {id}
 * @return {}
 */
router.post('/logout', async (req, res) => {
  try {
    req.session.save(() => {
      req.session.user = null;
      res.status(200).json({ message: 'You are logged out!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Delete a user
 * @param  {id}
 * @return {User}
 */
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      attributes: ['id', 'name', 'points', 'leader', 'avatar', 'portal_id'],
      where: { id: req.body.id },
    });

    if (!userData) {
      res.status(404).json({ message: 'Could not find that user!' });
      return;
    }

    const io = req.app.get('socketio');
    io.emit('deleted user', {id: req.params.id});

    res.status(200).json(userData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
