const express = require('express');
const router = express.Router();
const sourceHandler = require('../handlers/sourceHandler');

router.get('/get-capital-sources', sourceHandler.getCapitalSources);
router.get('/:sourceId', sourceHandler.getSourceById);
router.post('/add-capital-source', sourceHandler.addCapitalSource);
router.patch('/delete-capital-source/:sourceId', sourceHandler.deleteCapitalSource);

module.exports = router;
