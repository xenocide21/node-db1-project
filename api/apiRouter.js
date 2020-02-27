const router = require('express').Router();
const accountsRouter = require('../accounts/accounts-router');

router.use('/accounts', accountsRouter);

module.exports = router;