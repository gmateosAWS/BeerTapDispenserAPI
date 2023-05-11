import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {RoutesConfig} from './common/routes.config';
import {ApiRoutes} from './api/routes.config';
import debug from 'debug';
import helmet from 'helmet';

// Create the main Express application and add it to the http Server object
const app: express.Application = express();
const server: http.Server = http.createServer(app);
// Define backend port, different from frontend ports 80/443
const port = 3000;
const routes: Array<RoutesConfig> = [];
// Define debugging logger (for enhanced console traces)
const debugLog: debug.IDebugger = debug('app');

// Add middleware to parse all incoming requests as json
app.use(express.json());

// Add middleware to parse requests as json before going to our handlers 
app.use(bodyparser.json());

// Add the middleware to allow cross-origin requests
app.use(cors());

// Using the Helmet library to help protect against common security vulnerabilities
app.use(helmet());

// Set up express Winston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const winstonLoggerOptions: expressWinston.LoggerOptions  = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    // When not debugging, log requests as one-liners
    winstonLoggerOptions.meta = false;
    if (typeof global.it === 'function') {
        winstonLoggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
    }    
}

// And initialize the logger with the above configuration
app.use(expressWinston.logger(winstonLoggerOptions));

// Add the API routes to our array
// (after sending the Express.js app object to have the routes added to our app)
routes.push(new ApiRoutes(app));

// Simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

// Export our app to be consumed by our tests
export { app, server };

// Start the server
server.listen(port, () => {
    routes.forEach((route: RoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});