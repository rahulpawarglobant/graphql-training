const { GraphQLObjectType } = require("graphql");
const UserType = require("./types/UserType");
const UserArg = require("./types/UserArg");

const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  description: "this holds all the mutation APIs",
  fields: {
    user: {
      type: UserType,
      args: { input: { type: UserArg } },
      description: "Handler for create user",
      resolve: async (obj, { input }, context) => {
        const { pgPool, mongo } = context;
        const {
          rows: [user],
        } = await pgPool.query(
          `insert into users(first_name) values($1) returning *;`,
          [input.firstname]
        );
        await mongo
          .collection("metrics")
          .updateOne(
            { key: "userCount" },
            { $inc: { value: 1 } },
            { upsert: 1 }
          );
        return user;
      },
    },
  },
});

module.exports = RootMutationType;
