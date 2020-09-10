const mongoose = require('mongoose');

//order schema
const orderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    orders: [{
        items: [
            {
                productId: { type: String, required: true },
                categoryId: { type: String, required: true },
                discountPercent: { type: Number, required: true },
                taxPercent: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
                quantity: { type: Number, required: true },
                createdAt: { type: Date },
                modifiedAt: { type: Date, default: Date.now() },
                isDelivered: { type: Boolean, default: false }
            }
        ]
    }

    ]

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;



