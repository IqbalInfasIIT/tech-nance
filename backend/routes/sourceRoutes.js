const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

router.get('/get-capital-sources', sourceController.getCapitalSources);
router.get('/:sourceId', sourceController.getSourceById);
router.post('/add-capital-source', sourceController.addCapitalSource);
router.patch('/delete-capital-source/:sourceId', sourceController.deleteCapitalSource);


module.exports = router;
