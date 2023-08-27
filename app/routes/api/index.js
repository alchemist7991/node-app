const router = require('express').Router();
const cache = require('../../middleware/cacheMiddleware')

router.use('/v1/user', cache.usersCache, require('./users'));

module.exports = router;