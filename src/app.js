const express = require('express');
// const cors = require('cors');
const { createServer } = require('http');

const routerApi = require('./routes');
const { useGraphql } = require('./graphql');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const createApp = () => {
  const app = express();
  const httpServer = createServer(app);

  // app.use(express.json());
  // app.use(cors());

  require('./utils/auth');

  app.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });

  app.get('/nueva-ruta', checkApiKey, (req, res) => {
    res.send('Hola, soy una nueva ruta');
  });

  routerApi(app);
  useGraphql(app, httpServer);

  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  return app;
};

module.exports = createApp;
