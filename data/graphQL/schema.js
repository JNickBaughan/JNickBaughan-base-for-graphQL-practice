let db = require('../database');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const UnitType = new GraphQLObjectType({
    name: 'Unit',
    description: '...',
    fields: () => ({
        unitNumber: {
            type: GraphQLString,
            resolve: (data) => data.dataValues ? data.dataValues.unitNumber : data.unitNumber
          },
          id: {
            type: GraphQLString,
            resolve: (data) => data.dataValues ? data.dataValues.id : data.id
          }
      })
});

const BuildingType = new GraphQLObjectType({
    name: 'Building',
    description: '...',
    fields: () => ({
        address: {
            type: GraphQLString,
            resolve: (data) =>   data.dataValues ? data.dataValues.address : data.address
          },
          id: {
            type: GraphQLString,
            resolve: (data) => data.dataValues ? data.dataValues.id : data.id
          },
          units: {
            type: new GraphQLList(UnitType),
            resolve: (data) => {
                var id = parseInt(data.id, 10);
                return db.unit.findAll({ where: {buildingId: id} }).then(units => {
                    return units;
                }, e => {
                    return [];
                })
            } 
        }
      })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (data) => data.id
        },
        name: {
            type: GraphQLString,
            resolve: (data) => data.name
        },
        buildings: {
            type: new GraphQLList(BuildingType),
            resolve: (data) => {
                var id = parseInt(data.id, 10);
                return db.building.findAll({ where: {propertyId: id} }).then(buildings => {
                    return buildings;
                }, e => {
                    return {};
                })
            } 
        }
      })
});



module.exports  = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            property: {
                type: PropertyType,
                args: {
                    id: { type: GraphQLInt}
                },
                resolve: (root, args) => {
                    var id = parseInt(args.id, 10);
                    return db.property.findById(id).then(property => {
                        if(!!property){
                            return property.dataValues;
                        }else{
                            return {};
                        }
                    }, e => {
                        return {};
                    })
                }          
            },
            unit: {
                type: UnitType,
                args: {
                    id: { type: GraphQLInt}
                },
                resolve: (root, args) => {
                    var id = parseInt(args.id, 10);
                    return db.unit.findById(id).then(unit => {
                        if(!!unit){
                            return unit.dataValues;
                        }else{
                            return {};
                        }
                    }, e => {
                        return {};
                    })
                }  
            },
            building: {
                type: BuildingType,
                args: {
                    id: { type: GraphQLInt}
                },
                resolve: (root, args) => {
                    var id = parseInt(args.id, 10);
                    return db.building.findById(id).then(building => {
                        if(!!building){
                            return building.dataValues;
                        }else{
                            return {};
                        }
                    }, e => {
                        return {};
                    })
                }          
            }
            
        })
    })
})

//fetch();