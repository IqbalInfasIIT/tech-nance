const CategoryService = require('../services/categoryService');
const categoryService = new CategoryService();

exports.addCategory = async (req, res) => {
  const { name, parentCategoryId, isActive, type } = req.body;
  try {
    await categoryService.addCategory({ name, parentCategoryId, isActive }, type);
    res.status(201).json({ message: `${type.slice(0, -10)} category added successfully` });
  } catch (err) {
    console.error(`Error adding ${type} category:`, err);
    res.status(500).json({ error: err.message });
  }
};

exports.markCategoryInactive = async (req, res) => {
  const { categoryId, categoryType } = req.body;
  try {
    await categoryService.markCategoryInactive(categoryId, categoryType);
    res.status(200).json({ message: 'Category marked as inactive successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMainCategoryCount = async (req, res) => {
  const { type } = req.params;
  try {
    const count = await categoryService.getMainCategoryCount(type);
    res.status(200).json({ count });
  } catch (err) {
    console.error('Error getting main category count:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMainCategories = async (req, res) => {
  const { type } = req.params;
  try {
    const categories = await categoryService.getMainCategories(type);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting main categories:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getLinkedCategories = async (req, res) => {
  const { type, parentId } = req.params;
  try {
    const categories = await categoryService.getLinkedCategories(type, parentId);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting linked categories:', err);
    res.status(500).json({ error: err.message });
  }
};
