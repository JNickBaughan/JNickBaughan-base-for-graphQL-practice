module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('building', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        }
    })
}