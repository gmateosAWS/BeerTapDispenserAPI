import DispensersDao from '../daos/dispensers.daos';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateDispenserDto } from '../dto/create.dispenser.dto';
import { PatchDispenserDto } from '../dto/patch.dispenser.dto';

class DispensersService implements CRUD {
    async create(resource: CreateDispenserDto) {
        return DispensersDao.addDispenser(resource);
    }    

    async getById(id: string) {
        return DispensersDao.getDispenserById(id);
    }

    async patchById(id: string, resource: PatchDispenserDto) {
        return DispensersDao.updateDispenserById(id, resource);
    }
}

export default new DispensersService();