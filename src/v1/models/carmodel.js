const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true
    }
})

const Car = mongoose.model('carsrequest', carSchema);
module.exports = Car;