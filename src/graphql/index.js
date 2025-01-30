const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const express = require('express');

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hola mundo',
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
