const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {

        type: String,
        required: [true, 'Please Enter Your Name'],
        maxlength: [25, 'Name cannot have more than 25 characters'],
        minlength: [4, 'Name should have more then 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: [true, 'This email is already registered'],
        validate: [validator.isEmail, 'Please Enter Valid Email.']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minlength: [8, 'Password should have more then 4 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
//password incryption
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});

//jwt token
userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


// password compare
userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
};

//reset password token
userSchema.methods.getResetPasswordToken= function (){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hashing and adding to usershema
    this.resetPasswordToken= crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);