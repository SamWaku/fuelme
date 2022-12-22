const FuelRequest = require("../models/FuelRequest");
const ConfirmedFuelRequest = require("../models/confirmedfuelrequest");

exports.FuelRequest = async (req, res) => {
    try {
        const { userId,fueltype, amount, paymentmethod } = req.body;

        /* const userId = await FuelRequest.findById(req.params.id)
        if(!userId){
            return res.status(400).send({
                message: 'user not logged in!'
            })
        } */
        const newRequest =  new FuelRequest({
            userId,
            fueltype,
            amount, 
            paymentmethod
        })

        //saving to db
        await newRequest.save();
        //console.log(newRequest)
        res.status(201).send({
            message:'Fuel request made!'
        })
    } catch (error) {
         res.status(500).send({
            status: 500,
            error: error.message,
        });
    }
}