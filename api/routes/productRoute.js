const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, uploadImages } = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { productImgResize, uploadPhoto } = require('../middlewares/uploadImages');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);//ok
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages);//ok
router.get('/:id', getProduct);//ok
router.put('/:id', authMiddleware, isAdmin, updateProduct);//ok
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);//ok
router.get('/', getAllProduct);//ok


module.exports = router;
