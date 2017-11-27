const router = require('express').Router();
const auth = require('./auth');

router.use(auth);

router.use('/api', require('./api'));

module.exports = router;