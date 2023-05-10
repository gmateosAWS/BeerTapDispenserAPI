import {RoutesConfig} from '../common/routes.config';
import express from 'express';

export class ApiRoutes extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ApiRoutes');
    }

    configureRoutes() {
        // API routes handler code for the different exposed endpoints 
        this.app.route('/dispenser')
            // This endpoint will create a new dispenser with a configuration 
            // about how much volume comes out (litres per second)
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Dispenser created correctly`);
                /*
                {
                    "id": "94d5e49e-bb86-3a7c-1561-1e03d82951f3"
                    "flow_volume": -58210373.083513424,
                }
                O puede devolver error 500 (internal server error)
                */
            });
        this.app.route('/dispenser/:id/status')
            // This endpoint will change the status for a given dispenser
            .put((req: express.Request, res: express.Response) => {
                res.status(202).send(`PUT status requested for id ${req.params.id}`);
                /*
                Parámetros de entrada:
                {
                "status": "open",
                "updated_at": "2022-01-01T02:00:00Z"
                }
                Puede devolver: 202, 409 (already opened/closed), 500
                */
            });
        this.app.route('/dispenser/:id/spending')
            /*
                Returns the money spent by the given dispenser
                Whether the dispenser is open or close, this endpoint returns how much
                money has this dispenser Id spent break down by its uses.
                This endpoint could be request at any time, even if the tap is open
                (so, the closed_at field would be null).

                To do so, we will use a reference value of 12.25€/l.

                So, if the dispenser has configured the flow volume ratio as 
                0.064 litres/second and the tap was open for 22 seconds,
                the total spent for this usage is 17.248.
            */
            .get((req: express.Request, res: express.Response) => {
                res.status(202).send(`GET spending requested for id ${req.params.id}`);
                /*
                Parámetros de vuelta: ver API docs
                Puede devolver: 200, 404 (dispenser does not exist), 500
                */
            });            
        return this.app;
    }
}