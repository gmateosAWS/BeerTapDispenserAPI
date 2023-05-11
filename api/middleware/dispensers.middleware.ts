import express from 'express';
import DispensersService from '../services/dispensers.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:dispensers-middleware');

class DispensersMiddleware {
    async validateRequiredBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const method = req.method;
        if (method == 'POST') {
            if (req.body && req.body.flow_volume) {
                next();
            } else {
                res.status(400).send({
                    error: `Missing required field flow_volume`,
                });
            }
        } else if (method == 'PUT') {
            if (req.body && req.body.status) {
                if (req.body.status != 'open' && req.body.status != 'close') {
                    res.status(400).send({
                        error: `Status allowed values are only open or close`,
                    });                    
                } else {
                    // As "updated_at" is optional, we make sure it gets inititialized in case it is not provided or if the provided timestamp is not in UTC format
                    const UTCdateTimeRegex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/;
                    if (!req.body.updated_at || req.body.updated_at == "" || !UTCdateTimeRegex.test(req.body.updated_at)) {
                        req.body.updated_at = new Date();
                    } 
                    next();
                }
            } else {
                res.status(400).send({
                    error: `Status allowed values are only open or close`,
                });
            }
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