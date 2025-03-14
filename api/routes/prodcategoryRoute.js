const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory, getallCategory} = require('../controllers/prodcategoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


// les routes de category
router.post('/', authMiddleware, isAdmin, createCategory);//ok
router.put('/:id', authMiddleware, isAdmin, updateCategory);//ok
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);//ok
router.get('/:id', getCategory);//ok
router.get('/', getallCategory);//ok

module.exports = router;