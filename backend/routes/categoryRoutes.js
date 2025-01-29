const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/get-main-categories/:type', categoryController.getMainCategories);
router.get('/linked-categories/:type/:parentId', categoryController.getLinkedCategories);
router.get('/main-category-count/:type', categoryController.getMainCategoryCount);
router.post('/add-category', categoryController.addCategory);
router.delete('/delete-category', categoryController.deleteCategory);


module.exports = router;
