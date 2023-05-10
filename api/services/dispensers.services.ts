import DispensersDao from '../daos/dispensers.daos';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateDispenserDto } from '../dto/create.dispenser.dto';

class DispensersService implements CRUD {
    async create(resource: CreateDispenserDto) {
        return DispensersDao.addDispenser(resource);
    }    

    async patchById(id: string, resource: CreateDispenserDto) {
        return DispensersDao.patchDispenserById(id, resource);
    }

    async getById(id: string) {
        return DispensersDao.getDispenserById(id);
    }

}

export default new DispensersService();