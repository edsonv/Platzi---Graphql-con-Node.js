const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const express = require('express');
const { loadFiles } = require('@graphql-tools/load-files');
const resolvers = require('./resolvers');

// const typeDefs = `#graphql
//   type Query {
//     hello: String!
//     getPerson(name: String, age: Int): String
//     getInt(number: Int!): Int
//     getFloat: Float
//     getString: String
//     getBoolean: Boolean
//     getID: ID
//     getNumbers(numbers:[Int!]!):[Int]
//     getProduct: Product
//   }

//   type Product {
//     id: ID!
//     name: String!
//     price: Float!
//     description: String!
//     image: String!
//     createdAt: String!
//   }
// `;

const useGraphql = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
};

module.exports = { useGraphql };
