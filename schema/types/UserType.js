const { GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User object type",
  fields: {
    id: {
      type: GraphQLInt,
      resolve: (obj) => obj.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => {
          return obj.first_name;}
    },
  },
});

module.exports = UserType;
