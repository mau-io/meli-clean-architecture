import express from 'express';
import cors from 'cors';
import compression from 'compression';
import shouldCompress from '#src/shared/infrastructure/framework_drivers/express/midlewares/shouldCompress.js';
import health from '#src/shared/infrastructure/framework_drivers/express/routes/health.js';
import vitals from '#src/shared/infrastructure/framework_drivers/express/routes/vitals.js';

class ExpressServer {
  constructor(routes, middlewares, finalMiddlewares) {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    // compress all responses
    this.app.use(compression({
      // filter decides if the response should be compressed or not, 
      // based on the `shouldCompress` function above
      filter: shouldCompress,
      // threshold is the byte threshold for the response body size
      // before compression is considered, the default is 1kb
      threshold: 0,
      level: 9
    }));

    this.app.get('/vitals', vitals);
    this.app.get('/health', health);

    // Add each middleware to the application
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    });

    // Add the routes for each context
    routes.forEach(route => {
      this.app.use(route.router);
    });

    // Add the final middlewares
    finalMiddlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  listen(port, callback) {
    this.server = this.app.listen(port, callback);
    return this.server;
  }

  close(callback) {
    if (this.server) {
      this.server.close(callback);
    }
  }

  getApp() {
    return this.app;
  }
}

export default ExpressServer;