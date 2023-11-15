const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserVerification = sequelize.define("UserVerification", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          user: {
            type: DataTypes.INTEGER,
          },
          verification_code: {
            type: DataTypes.INTEGER,
          },
          created_at: {
            type: DataTypes.DATE,
          },
        }, {
          timestamps: false,
        })
    return UserVerification;
}