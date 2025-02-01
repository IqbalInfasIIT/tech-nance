const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

router.get('/get-capital-sources', sourceController.getCapitalSources);
router.get('/get-account-sources', sourceController.getAccounts);
router.get('/get-bank-accounts', sourceController.getBankAccounts);
router.get('/get-digital-wallets', sourceController.getDigitalWallets);
router.get('/get-cards', sourceController.getCards);
router.get('/get-credit-cards', sourceController.getCreditCards);
router.get('/get-gifts', sourceController.getGifts);
router.get('/:sourceId', sourceController.getSourceById);
router.post('/add-capital-source', sourceController.addCapitalSource);
router.patch('/delete-capital-source/:sourceId', sourceController.deleteCapitalSource);


module.exports = router;
