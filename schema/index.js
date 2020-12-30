const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./rootquerytype');
const RootMutationType= require('./rootmutationtype');

module.exports = new GraphQLSchema({
 query: RootQueryType,
 mutation: RootMutationType
});