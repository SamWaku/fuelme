const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const FuelItemStock = sequelize.define("FuelItemStock", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
        item_name: {
            type: DataTypes.STRING,
            unique: true
        },
        item_quantity: {
            type: DataTypes.INTEGER
        },
        item_price : {
            type: DataTypes.INTEGER
        },
        availabilty: {
            type: DataTypes.ENUM, //link from room 
            values: ['InStock', 'OutOfStock', 'Ordered'],
            allowNull: false,
            defaultValue: 'InStock'
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['Purchased', 'Retail', 'Pending'],
            allowNull: false,
            defaultValue: 'Retail'
        }
    })
    return FuelItemStock;
}