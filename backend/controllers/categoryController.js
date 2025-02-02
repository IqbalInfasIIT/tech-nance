const categoryService = require('../services/categoryService');

exports.addCategory = async (req, res) => {
  try {
    await categoryService.addCategory(req.body, req.body.type);
    res.status(201).send('Category added successfully');
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).send(`Error adding category: ${err.message}`);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.body.categoryId, req.body.categoryType);
    res.status(200).json({ message: 'Category and related subcategories marked as inactive successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: `Error deleting category: ${err.message}` });
  }
};

exports.getMainCategories = async (req, res) => {
  try {
    const categories = await categoryService.getMainCategories(req.params.type);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting categories:', err);
    res.status(500).json({ error: `Error getting categories: ${err.message}` });
  }
};

exports.getLinkedCategories = async (req, res) => {
  try {
    const categories = await categoryService.getLinkedCategories(req.params.type, req.params.parentId);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting linked categories:', err);
    res.status(500).json({ error: `Error getting linked categories: ${err.message}` });
  }
};

exports.getMainCategoryCount = async (req, res) => {
  try {
    const count = await categoryService.getMainCategoryCount(req.params.type);
    res.status(200).json({ mainCategoryCount: count });
  } catch (err) {
    console.error('Error getting main category count:', err);
    res.status(500).json({ error: `Error getting main category count: ${err.message}` });
  }
};
