const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        society: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }, 
        phone: {
            type: Number,
            required: true,
            unique: true
        },
        compte: {
            type: String,
            required: true
        },
        domainActivity: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        password: {
            type: String,
            required: true
        },
        cart: {
            type: Array,
            default: []
        },
        address: {
            type: String
        },
        country : {
            type: String
        },
        city: {
            type: String
        },
        zipCode:{
            type: String
        },
        command: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],  
        refreshToken: {
            type: String,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    });


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);    
}

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now()+30 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);
