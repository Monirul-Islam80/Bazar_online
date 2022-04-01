const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeature');
const { prototype } = require('nodemailer/lib/json-transport');
const cloudinary = require('cloudinary');
//create product  *admin request  
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const myCloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "product_image",
        });
        imagesLink.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        });

    }
    req.body.images = imagesLink
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});


//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
});

//get admin product
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    })
});

//updateProduct *admin request
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let Products = await Product.findById(req.params.id);
    if (!Products) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    let images = [];
    if (typeof req.body.images === 'string') {
     
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        for (let i = 0; i < Products.images.length; i++) {
            await cloudinary.v2.uploader.destroy(Products.images[i].public_id);
        }
        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: "product_image",
            });
            imagesLink.push({
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            });
        }
         req.body.images = imagesLink
    }


   
    Products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        Products
    })
});

// delete product *admin request

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let Products = await Product.findById(req.params.id);
    if (!Products) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    for (let i = 0; i < Products.images.length; i++) {
        await cloudinary.v2.uploader.destroy(Products.images[i].public_id);

    }
    await Products.remove();

    res.status(200).json({
        success: true,
        Products
    })
});
//single product

exports.getProcutDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }
    res.status(200).json({
        success: true,
        product
    })
});

//create new review and update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((r) => {
            if (r.user.toString() === req.user._id.toString()) {
                (r.rating = rating), (r.comment = comment);
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach(r => {
        avg += r.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true
    });

});

//get all reviews 

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//delete reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    const reviews = product.reviews.filter((r) => {
        return r._id.toString() !== req.query.id.toString();
    });

    let avg = 0;

    reviews.forEach((r) => {
        avg += r.rating;
    });
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    res.status(201).json({
        success: true
    })
})