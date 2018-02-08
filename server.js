let express = require("express");
let server = express();
const graphqlHTTP = require('express-graphql');
const graphQLschema = require('./data/graphQL/schema');
let PORT = 3000;

let db = require('./data/database');

server.use(express.static(__dirname + '/dist'));

server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: graphQLschema
}));

server.get('/property/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    db.property.findById(id).then(property => {
        if(!!property){
            res.json(property.toJSON());
        }else{
            res.status(404).send();
        }
    }, e => {
        res.status(500).send();
    })
});

server.get('/building/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    db.building.findById(id).then(building => {
        if(!!building){
            res.json(building.toJSON());
        }else{
            res.status(404).send();
        }
    }, e => {
        res.status(500).send();
    })
});

server.get('/unit/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    db.unit.findById(id).then(unit => {
        if(!!unit){
            res.json(unit.toJSON());
        }else{
            res.status(404).send();
        }
    }, e => {
        res.status(500).send();
    })
});

db.sequelizeInstance.sync(/*{force: true}*/).then(function(){
    console.log('db is ready');

    db.property.create({ name: 'Franklin West'}).then(property => {

        db.building.create({ address: 'Frankling West - Bldg A', propertyId: property.id}).then(building => {
            db.unit.create({ unitNumber: 'A', buildingId: building.id});
            db.unit.create({ unitNumber: 'B', buildingId: building.id});
        });

        db.building.create({ address: 'Frankling West - Bldg B', propertyId: property.id}).then(building => {
            db.unit.create({ unitNumber: '101', buildingId: building.id});
            db.unit.create({ unitNumber: '102', buildingId: building.id});
            db.unit.create({ unitNumber: '201', buildingId: building.id});
        });
        
    })

    db.property.create({ name: 'Franklin East'}).then(property => {

        db.building.create({ address: 'Frankling East ', propertyId: property.id}).then(building => {
            db.unit.create({ unitNumber: '101', buildingId: building.id});
            db.unit.create({ unitNumber: '102', buildingId: building.id});
            db.unit.create({ unitNumber: '103', buildingId: building.id});

            db.unit.create({ unitNumber: '201', buildingId: building.id});
            db.unit.create({ unitNumber: '202', buildingId: building.id});
            db.unit.create({ unitNumber: '203', buildingId: building.id});

            db.unit.create({ unitNumber: '301', buildingId: building.id});
            db.unit.create({ unitNumber: '302', buildingId: building.id});
            db.unit.create({ unitNumber: '303', buildingId: building.id});
        });
        
    })

    server.listen(PORT, function(){
        console.log('server listening on port: ' + PORT);
    })
});