const express = require('express');
const { createUser, loginUser, getUsers, getUser, deletUser, updateUser, handleRefreshToken, logout, updatePassword, forgotPassword, resetPassword, loginAdmin, saveAddress, userCart, getUserCart, emptyCart, createOrder, getOrders, updateOrderStatus } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post("/register", createUser);//ok
router.post('/forgot-password-token', forgotPassword);//ok
router.put('/reset-password/:token', resetPassword);//ok
router.put('/order-status/:id', authMiddleware, isAdmin, updateOrderStatus);//ok--
router.put("/password", authMiddleware, updatePassword);//ok
router.post("/login", loginUser);//ok
router.post("/login-admin", loginAdmin);//ok
router.post('/cart', authMiddleware, userCart);//ok --------------------------
router.get("/all-users", authMiddleware, isAdmin, getUsers);//ok
router.get("/orders", authMiddleware, getOrders);//ok --
router.get("/refresh", handleRefreshToken);//ok
router.get('/logout', logout);//ok
router.get("/cart", authMiddleware, getUserCart); //ok ---------------------
router.delete('/empty-cart', authMiddleware, emptyCart);//ok -------------------
router.post('/cart/cash-order', authMiddleware, createOrder);//ok --
router.get("/:id", authMiddleware, isAdmin, getUser);//ok
router.delete("/:id", authMiddleware, isAdmin, deletUser);//ok
router.put("/edit-user", authMiddleware, updateUser);//ok
router.put('/save-address', authMiddleware, saveAddress);//ok




// exportation des routes users
module.exports = router;