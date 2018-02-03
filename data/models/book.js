module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('book', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        }
    })
}