const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");


exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,

    });
    res.status(201).json({
        success: true,
        order
    });

});


// get single users order 
exports.getSingleOrder = catchAsyncError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success:true,
        order
    });
});

// get logged in  users order
exports.getMyOrders = catchAsyncError(async(req, res, next)=>{
    const orders = await Order.find({ user: req.user._id });


    res.status(200).json({
        success:true,
        orders
    });
});

//  get all orders *admin
exports.getAllOrders = catchAsyncError(async(req, res, next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order=> totalAmount += orders.totalPrice);
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });
});

// update order status *admin
exports.updateOrders = catchAsyncError(async(req, res, next)=>{

    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler('This Order already delivered',400));
    }
   if(order.orderStatus === 'Shipped'){
        order.orderItem.forEach(async(o)=>{
        await updateStock(o.product, o.quantity);
    })}    
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave: false});
    res.status(200).json({
        success:true,
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});

}

//delete order *admin
exports.deleteOrder = catchAsyncError(async(req, res, next)=>{

    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
    });
})