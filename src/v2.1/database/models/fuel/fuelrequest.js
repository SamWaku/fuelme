const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const FuelRequest = sequelize.define("FuelRequest",{
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING,
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
    return FuelRequest;
}