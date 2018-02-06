module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('unit', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        unitNumber: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        }
    })
}