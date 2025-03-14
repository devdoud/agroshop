const User = require('../models/userModel');
const Product =  require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwToken');
const { validateMongoObId } = require('../utils/validateMongoObId');
const { generateRefreshToken } = require('../config/refreshToken');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendMail } = require('./emailController');
const uniqid = require('uniqid');


// Creation d'un utilisateur
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User already exist");
    }
});

// Connexion
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken,
        }, { new: true });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            phone: findUser?.phone,
            society: findUser?.society,
            compte: findUser?.compte,
            role: findUser?.role,
            domainActivity: findUser?.domainActivity,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Mot de passe ou email incorrect");
    }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not autorised");
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        }, { new: true });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            id: findAdmin?._id,
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            phone: findAdmin?.phone,
            role: findAdmin?.role,
            token: generateToken(findAdmin?._id)
        });
    } else {
        throw new Error("Mot de passe ou email incorrect");
    }
});


// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token in cookies");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh token present in bd");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("there is sommething wrong with refresh token");

        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken });
    });

    res.json(user);
});


// Logout fonction

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user){
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, { 
        refreshToken: "", 
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(204);

});

// update user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    // const { id } = req.params;
    validateMongoObId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            society: req?.body?.society,
            email: req?.body?.email,
            phone: req?.body?.phone,
            compte: req?.body?.compte,
            role: req?.body?.role,
            domainActivity: req?.body?.domainActivity,
        }, {
            new: true
        });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all user
const getUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);

    }
});


// save user address
const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoObId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
            country: req?.body?.country,
            city: req?.body?.city,
            zipCode: req?.body?.zipCode,
        }, {
            new: true
        });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

// get one user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const getUser = await User.findById(id);
        res.json({ getUser });
    } catch (error) {
        throw new Error(error);
    }
});

// delete one user
const deletUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const delUser = await User.findByIdAndDelete(id);
        res.json({ delUser });
    } catch (error) {
        throw new Error(error);
    }
});


// change password api

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoObId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
});


// forgot password api
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi Please follow this link to reset your password. This link is valid in 10 munites. <a href="https://agrospace.co/api/user/reset-password/${token}">click here</a>`;
        const data = {
            to: email,
            text: "Hey user",
            subject: "osho forgot password link",
            htm: resetURL
        };
        sendMail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }

});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token expired, please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});



const userCart = asyncHandler(async (req, res, next) =>{
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoObId(_id);
    try {
        let products = [];
        const user = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({ orderBy: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.tissu = cart[i].tissu;
            object.texture = cart[i].texture;
            object.style = cart[i].style;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user?._id
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});


const getUserCart = asyncHandler(async (req, res) =>{
    const { _id } = req.user;
    console.log(_id);
    validateMongoObId(_id);
    try {
        const cart = await Cart.findOne({ orderBy: _id }).populate("products.product");
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});


const emptyCart = asyncHandler(async (req, res) =>{
    const { _id } = req.user;
    validateMongoObId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndDelete({ orderBy: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied, tissu, texture, style } = req.body;
    const { _id } = req.user;
    validateMongoObId(_id);
    try {
        if(!COD) throw new Error("Create cash order failled");
        const user = await User.findById(_id); 
        let userCart = await Cart.findOne({ orderBy: user._id });
        let finalAmout = 0;
        if(couponApplied && userCart.totalAfterDiscount){
            finalAmout = userCart.totalAfterDiscount;
        }else{
            finalAmout = userCart.cartTotal * 100;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmout,
                status: "Cash on delivery",
                created: Date.now(),
                currency: "usd",
            },
            customs: {
                tissu: tissu,
                texture: texture,
                style: style
            },
            orderStatus: "Cash on delivery",
            orderBy: user._id,
            
        }).save();
        let update = userCart.products.map((item)=>{
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoObId(_id);
    try {
        const userorders = await Order.findOne({ orderBy: _id }).populate('products.product').exec();
        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
});

const updateOrderStatus = asyncHandler(async (req, res) =>{
    const { status } = req.body;
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(id, { orderStatus: status, paymentIntent: { status: status, }, }, { new: true, });
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createUser, loginUser, getUsers, getUser, deletUser, updateUser, handleRefreshToken, logout, updatePassword, forgotPassword, resetPassword, loginAdmin, saveAddress, userCart, getUserCart, emptyCart, createOrder, getOrders, updateOrderStatus };
