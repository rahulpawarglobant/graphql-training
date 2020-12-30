const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");
const UserType = require('./types/UserType');

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This holds all the query APIs",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      description: "Handler for get users list",
      resolve: async (obj, args, context) => {
        const { pgPool } = context;
        return pgPool.query(`select * from users;`, []).then((res) => res.rows);
      },
    },
    usersCount: {
      type: GraphQLInt,
      description: "Handler for get usersCount",
      resolve: async (obj, args, context) => {
        const { mongo } = context;
        return mongo
          .collection("metrics")
          .findOne({ key: "userCount" })
          .then((res) => res.value);
      },
    },
  },
});

module.exports = RootQueryType;
