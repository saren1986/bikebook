const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/strava', require('./strava'));

module.exports = router;
