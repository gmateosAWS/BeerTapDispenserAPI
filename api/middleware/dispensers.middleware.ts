import express from 'express';
import DispensersService from '../services/dispensers.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:dispensers-controller');

class DispensersMiddleware {
    async validateRequiredBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.flow_volume) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required field flow_volume`,
            });
        }
    }

    async validateDispenserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dispenser = await DispensersService.getById(req.params.id);
        if (dispenser) {
            next();
        } else {
            res.status(404).send({
                error: `Requested dispenser ${req.params.id} does not exist`,
            });
        }
    }
    
    async extractDispenserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.id;
        next();
    }
 
}

export default new DispensersMiddleware();