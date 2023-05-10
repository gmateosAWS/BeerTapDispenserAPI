// Import express to add types to the request/response 
// objects from our controller functions
import express from 'express';

// Import our dispenser services
import dispenserService from '../services/dispenser.services';

// Use debug with custom context
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class DispensersController {

    async createDispenser(req: express.Request, res: express.Response) {
        // TO-DO: ¿donde ponemos este valor?
        // req.body.flow_volume viene en la request
        req.body.pricePerLiter = 12.25;
        req.body.status = "open";
        req.body.updatedAt = new Date();
        const dispenserId = await dispenserService.create(req.body);
        res.status(200).send({ id: dispenserId });
    }

    async changeStatus(req: express.Request, res: express.Response) {
        if (req.body.status == 'close') {
            req.body.status = 'closed';
        }
        log(await dispenserService.patchById(req.params.id, req.body));
        res.status(202).send();
    }

    async getRevenue(req: express.Request, res: express.Response) {
        log(await dispenserService.getById(req.params.id));
        res.status(204).send();
    }
}