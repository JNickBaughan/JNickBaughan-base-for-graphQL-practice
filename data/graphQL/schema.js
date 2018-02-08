let db = require('../database');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const BuildingType = new GraphQLObjectType({
    name: 'Building',
    description: '...',
    fields: () => ({
        name: {
          type: GraphQLString,
          resolve: (data) => data.address
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
        building: {
            type: BuildingType,
            resolve: (data) => {
                var id = parseInt(data.id, 10);

                return db.building.findOne({ where: {propertyId: id} }).then(building => {
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
            }
            
        })
    })
})

//fetch();