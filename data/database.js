let sequelize = require('sequelize');
let sequelizeInstance = new sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/dev-api.sqlite'
});

let database = {};
//console.log(sequelize);
database.store = sequelizeInstance.import(__dirname + '/models/store.js');
database.book = sequelizeInstance.import(__dirname + '/models/book.js');
database.author = sequelizeInstance.import(__dirname + '/models/author.js');

//a author can write more than one book
database.author.hasMany(database.book);

database.book.belongsToMany(database.store, {through: 'Book_Store'});
database.store.belongsToMany(database.book, {through: 'Book_Store'});



database.sequelize = sequelize;
database.sequelizeInstance = sequelizeInstance;

module.exports = database;
