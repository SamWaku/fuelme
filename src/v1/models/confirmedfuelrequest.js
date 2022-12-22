const mongoose = require('mongoose');

const ConfirmedFuelRequestSchema = mongoose.Schema({
    fuelRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FuelRequest"
    },
    Distance: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    Amount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "delivered"],
        default: "pending",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("ConfirmedFuelRequest", ConfirmedFuelRequestSchema)