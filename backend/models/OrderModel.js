const mongoose = require('mongoose')
const schema = mongoose.Schema


const OrderSchema = new schema({
    products: [{
        type: mongoose.ObjectId,
        ref: "Product"
    },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "Verifying Details",
        enum: ["Verifying Details", "Shipping", "Delivered", "Canceled"],
    },
},
    { timestamps: true })

const Order = mongoose.model("Order", OrderSchema)
module.exports = { Order };