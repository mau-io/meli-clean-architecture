/**
 * Express Server
 */
import ExpressServer from '#src/shared/infrastructure/framework_drivers/express/ExpressServer.js';

// middlewares 
const middlewares = [
];

// Export the server application without listening
export const app = new ExpressServer([
], middlewares);