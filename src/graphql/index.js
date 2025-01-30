const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const express = require('express');
const { loadFiles } = require('@graphql-tools/load-files');

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

const resolvers = {
  Query: {
    hello: () => 'Hola mundo',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I am ${args.age} years old`,
    getInt: (_, { number }) => number,
    getFloat: (_, { number }) => number,
    getString: () => 'Esta es una cadena',
    getBoolean: () => true,
    getID: () => '123123123',
    getNumbers: (_, { numbers }) => numbers,
    getProduct: () => {
      return {
        id: '1212',
        name: 'product 1',
        price: '100.12',
        description: 'Bla bla bla',
        image: 'http://image.asas',
        createdAt: new Date().toISOString(),
      };
    },
  },
};

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
