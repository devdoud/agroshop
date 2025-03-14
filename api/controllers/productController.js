const Product = require('../models/productModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const fs = require('fs');
const cloudinaryUploadImg = require('../utils/cloudinay');
const { validateMongoObId } = require('../utils/validateMongoObId');

// Creation des produits
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Mis à jour de produit

const updateProduct = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    validateMongoObId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateproduct = await Product.findByIdAndUpdate(id , req.body, { new:true, });
        res.json(updateproduct);
    } catch (error) {
        throw new Error(error);
    }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const deleteproduct = await Product.findByIdAndDelete(id);
        res.json(deleteproduct);
    } catch (error) {
        throw new Error(error);
    }
});

// get one product
const getProduct = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// get all product and filtre product function
const getAllProduct = asyncHandler(async (req, res) =>{

    try {

        // filtre algorithme
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        // sort algorithme
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount)
                throw new Error("This page does not exists");
                
        } 

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const uploadImages = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    validateMongoObId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for(const file of files){
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findProduct = await Product.findByIdAndUpdate(id, {
            images: urls.map((file) => {return file}),
        }, { new: true, });
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, uploadImages };