const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
exports.isAuthUser = catchAsyncError(async(req, res, next)=>{
    
    const { Token } = req.cookies;

    if(!Token){
        return next(new ErrorHandler('Please Login To Accesss This Resource', 401));
    }
    
    const decodeData = jwt.verify(Token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    next();
});

//authorized role

exports.authorizedRoles=(...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not alowed to access this resource. *Admin Only`, 403));
        }
        next();
    };

};