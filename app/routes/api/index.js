const router = require('express').Router();

router.use('/v1/user', require('./users'));

module.exports = router;