const { DataTypes, Sequelize } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const GoogleUser = sequelize.define("GoogleUser", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        googleId: {
            type: DataTypes.STRING
        },
        displayName:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        familyName: {
            type: DataTypes.STRING
        },
        givenName: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
    })
    return GoogleUser
}




 

