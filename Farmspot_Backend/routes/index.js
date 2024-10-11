const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/', require('./product'));
router.use('/feedback', require('./feedback'));

module.exports = router;