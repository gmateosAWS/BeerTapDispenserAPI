import {RoutesConfig} from '../common/routes.config';
import DispensersController from './controllers/dispensers.controller';
import DispensersMiddleware from './middleware/dispensers.middleware';
import express from 'express';

export class ApiRoutes extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ApiRoutes');
    }

    configureRoutes() {
        // API routes handler code for the different exposed endpoints 
        this.app
            /* This endpoint will create a new dispenser with a configuration 
               about how much volume comes out (litres per second)
               Input (body):
                {
                    "flow_volume": -58210373.083513424,
                }
               Response 200:
                {
                    "id": "94d5e49e-bb86-3a7c-1561-1e03d82951f3"
                    "flow_volume": -58210373.083513424,
                }
                Response 500: internal server error
            */
            .route('/dispenser')            
            .post(
                DispensersMiddleware.validateRequiredBodyFields,
                DispensersController.createDispenser                
            );
        
        // This middleware extracts the param 'id' from path and add it to the body so everything is in there
        this.app.param(`id`, DispensersMiddleware.extractDispenserId);            
        
        this.app
            /* This endpoint will change the status for a given dispenser
                Input (body):
                {
                    "status": "open",
                    "updated_at": "2022-01-01T02:00:00Z"
                }
                Output: 202, 409 (already opened/closed), 500
            */
            .put('/dispenser/:id/status', [
                DispensersMiddleware.validateDispenserExists,
                DispensersMiddleware.validateRequiredBodyFields,
                DispensersController.changeStatus
            ]);

        this.app
            /*
                Returns the money spent by the given dispenser.
                Whether the dispenser is open or close, this endpoint returns how much
                money has this dispenser spent break down by its uses.
                This endpoint could be request at any time, even if the tap is open
                (so, the closed_at field would be null).

                We will use a reference value of 12.25€/l.

                Responses: 200 (spent + usages), 404 (dispenser does not exist), 500
            */
            .get('/dispenser/:id/spending', [
                DispensersMiddleware.validateDispenserExists,
                DispensersController.getAmountAndUsages
            ]);

        return this.app;
    }
}