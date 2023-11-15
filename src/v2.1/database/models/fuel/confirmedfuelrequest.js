const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const ConfirmedRequest = sequelize.define("ConfirmedRequest", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        fuelrequestid: {
            type: DataTypes.INTEGER,
        },
        user: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.INTEGER,
            comment: 'Price amount of the post',
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        fuel_type: {
            type: DataTypes.ENUM,
            values: ['Petrol', 'Diseal', 'Gas'],
            allowNull: false,
            defaultValue: 'Petrol'
        },
        payment_method: {
            type: DataTypes.STRING(100),
        },
        created_at: {
            type: DataTypes.DATE,
        },
    })
    return ConfirmedRequest;
}