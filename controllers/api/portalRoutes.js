const router = require('express').Router();
const pickCode = require('../../utils/pickCode');
const games = require('../../jsonDB/games.json');
const { Portal, User, Round } = require('../../models');

/**
 * Create a new portal
 * @param  {body: code}
 * @return {id, code, round, phase, Round, Users}
 */
router.post('/', async (req, res) => {
  try {
    const game = games.filter((g) => g.url === req.body.game)[0].title;

    const portalData = await Portal.create(
      {
        code: pickCode(),
        game,
      },
      {
        include: [{ model: Round }, { model: User }],
        attributes: ['id', 'code', 'round', 'phase'],
      }
    );

    res.json(portalData);
  } catch (err) {
<<<<<<< HEAD
=======
    console.log(err);
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
    res.status(400).json(err);
  }
});

/**
 * Find a portal with an id or code
 * @param  {id || code}
 * @return {id, code, round, phase, Round, Users}
 */
router.get('/:id', async (req, res) => {
  try {
    const whereParams = {};

    if (isNaN(req.params.id)) {
      whereParams.code = req.params.id;
    } else {
      whereParams.id = req.params.id;
    }

    const portalData = await Portal.findOne({
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
      where: whereParams,
    });

    if (!portalData) {
      res.status(400).json({ message: 'Could not find that portal!' });
      return;
    }

    res.json(portalData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Update a portal
 * @param  {id}
 * @param  {body: round, phase}
 * @return {id, code, round, phase, Round, Users}
 */
router.put('/:id', async (req, res) => {
  try {
    let portalData = await Portal.findOne({
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'code', 'round', 'phase'],
      where: { id: req.params.id },
    });

    if (!portalData) {
      res.status(400).json({ message: 'Could not find that portal!' });
      return;
    }

    if (req.body.round) {
      portalData = await portalData.update({
        round: req.body.round,
      });
    }

    if (req.body.phase) {
      portalData = await portalData.update({
        phase: req.body.phase,
      });
    }

<<<<<<< HEAD
=======
    const io = req.app.get('socketio');
    io.emit('phase changed', portalData);

>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
    res.json(portalData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Delete a portal
 * @param  {id}
 * @return {Portal}
 */
router.delete('/:id', async (req, res) => {
  try {
    const portalData = await Portal.destroy({
      where: { id: req.body.id },
    });

    if (!portalData) {
      res.status(404).json({ message: 'Could not find that portal!' });
      return;
    }

    res.status(200).json(portalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
