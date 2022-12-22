const mongoose = require('mongoose');

const FuelRequestSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fueltype: {
        type: String,
        enum: ["Petrol", "Diseal", "Gas"],
        default: "Petrol",
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    paymentmethod: {
        type: String,
        enum: ["Cash", "Mobile Money", "Card"],
        default: "Cash",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("FuelRequest", FuelRequestSchema)