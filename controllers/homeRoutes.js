const router = require('express').Router();
const games = require('../jsonDB/games.json');

/**
 * Homepage
 * @param  {}
 * @return {games}
 */

router.get('/', async (req, res) => {
  try {
    res.render('hero', {
      games,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
