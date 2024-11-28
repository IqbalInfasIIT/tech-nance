const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountController');

router.post('/add-account', accountsController.addAccount);
router.get('/get-accounts', accountsController.getAccounts);
router.delete('/:accountId', accountsController.deleteAccount);

module.exports = router;
