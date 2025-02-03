const db = require('../database/db');
const Category = require('../models/Category');
const CategoryService = require('../services/categoryService');

const categoryModel = new Category(db);
const categoryService = new CategoryService(categoryModel);

exports.deleteCategory = async (req, res) => {
  const { categoryId, categoryType } = req.body;

  try {
    await categoryService.deleteCategory(categoryId, categoryType);
    res.status(200).json({ message: 'Category and related subcategories marked as inactive successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: err.message });
  }
};

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

exports.getMainCategories = async (req, res) => {
  const { type } = req.params;

  try {
    const categories = await categoryService.getMainCategories(type);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting categories:', err);
    res.status(500).json({ error: 'Error getting categories' });
  }
};

exports.getLinkedCategories = async (req, res) => {
  const { type, parentId } = req.params;

  try {
    const subcategories = await categoryService.getLinkedCategories(type, parentId);
    res.status(200).json(subcategories);
  } catch (err) {
    console.error(`Error getting linked ${type}:`, err);
    res.status(500).json({ error: 'Error getting linked categories' });
  }
};

exports.getMainCategoryCount = async (req, res) => {
  const { type } = req.params;
  try {
    const mainCategoryCount = await categoryService.getMainCategoryCount(type);
    res.status(200).json({ mainCategoryCount });
  } catch (err) {
    console.error(`Error getting main ${type} category count:`, err);
    res.status(500).json({ error: 'Error getting main category count' });
  }
};
