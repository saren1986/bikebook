/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');

const dotenv = require('dotenv');

const path = require('path');
const mongoose = require('mongoose');

const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/index');
const cors = require('cors')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

const { checkAuth } = require('./services/AuthService');

/**
 * Controllers (route handlers).
 */


/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.NODE_ENV === 'dev' ? process.env.MONGODB_DEV_URI : process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use(cors())
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Primary app routes.
 */
app.use(require('./routes'));
app.get('/test', checkAuth, function(req, res, next){
  res.send(`<h1>Hello ${req.user.username}!</h1>`);
});


/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'dev') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

app.use(checkAuth);
app.use('/graphql', graphqlHTTP.graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: process.env.NODE_ENV === 'dev',
  customFormatErrorFn(err) {
    if (!err.originalError) {
      return err;
    }
    const { data } = err.originalError;
    const message = err.message || 'An error occurred';
    const code = err.originalError.code || 500;
    return {
      message,
      status: code,
      data,
    };
  },
}));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
