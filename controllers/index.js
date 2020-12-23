const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const liarLiarRoutes = require('./liarLiarRoutes');

router.use('/', homeRoutes);
router.use('/liarliar', liarLiarRoutes);
router.use('/api', apiRoutes);

module.exports = router;
