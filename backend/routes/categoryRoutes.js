const express = require('express');
const router = express.Router();
const categoryHandler = require('../handlers/categoryHandler');

router.get('/get-main-categories/:type', categoryHandler.getMainCategories);
router.get('/linked-categories/:type/:parentId', categoryHandler.getLinkedCategories);
router.get('/main-category-count/:type', categoryHandler.getMainCategoryCount);
router.post('/add-category', categoryHandler.addCategory);
router.delete('/delete-category', categoryHandler.markCategoryInactive);

module.exports = router;
