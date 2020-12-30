const { GraphQLString, GraphQLInputObjectType } = require("graphql");

const UserArg = new GraphQLInputObjectType({
  name: "UserArg",
  fields: {
    firstname: { type: GraphQLString },
  },
});

module.exports = UserArg;
