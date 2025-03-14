const mongoose = require('mongoose');


var prodcategorySchema =  new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PCategory", prodcategorySchema);