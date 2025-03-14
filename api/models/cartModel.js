const mongoose = require('mongoose');

var cartSchema =  new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
                price: Number,
                tissu: {
                    type: String,
                    required: true
                },
                style: {
                type: String,
                required: true
                },
                texture: {
                    type: String,
                    required: true
                },
                mesure: []
            },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },  
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);