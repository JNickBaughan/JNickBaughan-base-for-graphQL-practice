module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('author', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        }
    })
}