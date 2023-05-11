// Import express to add types to the request/response 
// objects from our controller functions
import express from 'express';

// Import our dispenser services
import dispenserService from '../services/dispensers.services';

// Use debug with custom context
import debug from 'debug';

const log: debug.IDebugger = debug('app:dispensers-controller');

class DispensersController {

    async createDispenser(req: express.Request, res: express.Response) {
        // TO-DO: ¿donde ponemos este valor?
        // req.body.flow_volume viene en la request
        req.body.pricePerLiter = 12.25;
        req.body.status = "close";
        req.body.updated_at = new Date();
        const dispenser = await dispenserService.create(req.body);
        res.status(200).send(dispenser);
    }

    async changeStatus(req: express.Request, res: express.Response) {
        const dispenser = await dispenserService.getById(req.body.id);
        if (dispenser && dispenser !== undefined && dispenser.status == req.body.status) {
            res.status(409).send( `Dispenser ${dispenser.id} status is already ${dispenser.status}`);
        }
        log(await dispenserService.patchById(req.body.id, req.body));
        res.status(202).send();
    }

    async getAmount(req: express.Request, res: express.Response) {
        //log(await dispenserService.getAmountById(req.body.id));
        //res.status(200).send();
    }
}

export default new DispensersController();