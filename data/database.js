let sequelize = require('sequelize');
let sequelizeInstance = new sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/dev-api.sqlite'
});

let database = {};

database.property = sequelizeInstance.import(__dirname + '/models/property.js');
database.building = sequelizeInstance.import(__dirname + '/models/building.js');
database.unit = sequelizeInstance.import(__dirname + '/models/unit.js');

//a property can have multiple buildings on it, but a building is only on one property
database.property.hasMany(database.building);

//a building can have many units but a unit belongs to one building
database.building.hasMany(database.unit);


database.sequelize = sequelize;
database.sequelizeInstance = sequelizeInstance;

module.exports = database;
