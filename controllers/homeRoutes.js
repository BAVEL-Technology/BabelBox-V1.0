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
<<<<<<< HEAD
=======
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
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
  }
});

module.exports = router;
