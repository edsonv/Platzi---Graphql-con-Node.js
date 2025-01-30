const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const express = require('express');

const typeDefs = `#graphql
  type Query {
    hello: String
    getPerson(name: String, age: Int): String
    getInt(number: Int): Int
    getFloat: Float
    getString: String
    getBoolean: Boolean
    getID: ID
  }
  
`;

const resolvers = {
  Query: {
    hello: () => 'Hola mundo',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I am ${args.age} years old`,
    getInt: (_, { number }) => 123,
    getFloat: () => 123.5,
    getString: () => 'Esta es una cadena',
    getBoolean: () => true,
    getID: () => '123123123',
  },
};

const useGraphql = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
};

module.exports = { useGraphql };
