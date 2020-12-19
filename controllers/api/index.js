const router = require('express').Router();
const userRoutes = require('./userRoutes');
const portalRoutes = require('./portalRoutes');
const answerRoutes = require('./answerRoutes');
const roundRoutes = require('./roundRoutes');

router.use('/users', userRoutes);
router.use('/portals', portalRoutes);
router.use('/answers', answerRoutes);
router.use('/rounds', roundRoutes);


module.exports = router;
