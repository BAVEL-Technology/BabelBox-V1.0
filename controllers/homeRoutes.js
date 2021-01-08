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

/**
 * About Us Page
 * @param  {}
 * @return {games}
 */

router.get('/aboutus', async (req, res) => {
  try {
    res.render('about-us', {
      games,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
