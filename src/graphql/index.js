const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const express = require('express');
const { loadFiles } = require('@graphql-tools/load-files');
const resolvers = require('./resolvers');
const { buildContext } = require('graphql-passport');
const {
  typeDefs: scalarsTypeDefs,
  resolvers: scalarsResolvers,
} = require('graphql-scalars');

const useGraphql = async (app, httpServer) => {
  const typeDefs = [
    ...(await await loadFiles('./src/**/*.graphql')),
    scalarsTypeDefs,
  ];
  const allResolvers = [resolvers, scalarsResolvers];

  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res }),
    })
  );
};

module.exports = { useGraphql };
