const router = require('express').Router();
const { Answer, User, Round } = require('../../models');

/**
 ____  _____    _    ____
|  _ \| ____|  / \  |  _ \
| |_) |  _|   / _ \ | | | |
|  _ <| |___ / ___ \| |_| |
|_| \_\_____/_/   \_\____/
* Find all answers for given round
* @param  {body: round_id}
* @return {id, answer, Round, User}
*/
router.get('/', async (req, res) => {
  try {
    const roundData = await Round.findOne({
      where: { id: req.body.round_id },
    });

    if (!roundData) {
      res.json({ message: 'Could not find that round!' });
    }

    const answerData = await Answer.findAll({
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'answer'],
      // eslint-disable-next-line camelcase
      where: { round_id: req.body.round_id },
    });

    res.json({ answers: answerData });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
  ____ ____  _____    _  _____ _____
 / ___|  _ \| ____|  / \|_   _| ____|
| |   | |_) |  _|   / _ \ | | |  _|
| |___|  _ <| |___ / ___ \| | | |___
 \____|_| \_\_____/_/   \_\_| |_____|
* Create an answer
* @param  {body: round_id, user_id}
* @return {id, answer, Round, User}
*/
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!userData) {
      res.json({ message: 'Could not find that user!' });
    }

    const roundData = await Round.findOne({
      where: { id: req.body.round_id },
    });

    if (!roundData) {
      res.json({ message: 'Could not find that round!' });
    }

    const answerData = await Answer.create(req.body, {
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'answer'],
    });

    res.json(answerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * Find an answer with the given id
 * @param  {id}
 * @return {id, answer, Round, User}
 */
router.get('/:id', async (req, res) => {
  try {
    const answerData = await Answer.findOne({
      include: [{ model: Round }, { model: User }],
      attributes: ['id', 'answer'],
      where: { id: req.params.id },
    });

    res.json({ answer: answerData });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
* Delete an answer
 ____  _____ _     _____ _____ _____
|  _ \| ____| |   | ____|_   _| ____|
| | | |  _| | |   |  _|   | | |  _|
| |_| | |___| |___| |___  | | | |___
|____/|_____|_____|_____| |_| |_____|
* @param  {id}
* @return {Answer}
*/
router.delete('/:id', async (req, res) => {
  try {
    const answerData = await Answer.destroy({
      where: { id: req.body.id },
    });

    if (!answerData) {
      res.status(404).json({ message: 'Could not find that answer!' });
      return;
    }

    res.status(200).json(answerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
