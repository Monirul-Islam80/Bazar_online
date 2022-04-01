const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    const { name, email, password } = req.body;
    const newUser = { name, email, password}
    if (req.body.avatar !== "no_avatar") {
           const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        crop: "scale",
        folder: "bazar_avatar",
        width: 150

    });
    newUser.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }else{
        newUser.avatar = {
            public_id: req.body.avatar,
            url: req.body.avatar
        }
    }
 

    
    

    const user = await User.create(
        newUser
    );
    sendToken(user, 201, res);

});



//login

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 404))
    };
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 404))
    }

    sendToken(user, 200, res);

});
console.log
//logout

exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie('Token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "LogedOut"
    })
});

//forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found!', 404));
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
// ${req.protocol}://${req.get(
//         'host')}
    const resetPasswordUrl = `${req.protocol}://
    ${req.get("host")}/password/reset/${resetToken}`;
    const message = `<h2>Dear User,</h2>
    <p style="color:white;">
    You have requested for reset password. To reset your password please 
    click the link :-</br>
      ${resetPasswordUrl}</br>   
      
      If You did not requested for reset password then, Please Ignore This Email.</br>
      Thank You... \n\n
    </p>`
        ;

    try {
        await sendEmail({
            email: user.email,
            subject: `Bazar.com reset password`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})


//reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.Token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });


    if (!user) {
        return next(new ErrorHandler('Reset Password Token is invalid or has been Expired', 400))
    };

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();

    sendToken(user, 200, res);
})


//get user details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });

});


//update user password

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Confirm Password does not match with new Password ', 400));
    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);

})

//update user profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }


    if (req.body.avatar !== "") {
    
    console.log(req.body.avatar)
        const user = await User.findById(req.user.id);

        const imageId =  user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);


        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            crop: "scale",
            folder: "bazar_avatar",
            width: 150
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(201).json({ 
        success: true
    });
})


//get all user *admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});



//get all users *admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    });
});

//update user role *admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
   
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(201).json({
        success: true
    })
});

//delete user *admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

  

    if (!user) {
     
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 404));
    }
    
    const imageId =  user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();

    res.status(201).json({
        success: true,
        message: 'user deleted successfully'
    })
});