import { CreateDispenserDto } from '../dto/create.dispenser.dto';
import { PatchDispenserDto } from '../dto/patch.dispenser.dto';
import { nanoid } from 'nanoid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class DispensersDao {
    dispensers: Array<CreateDispenserDto> = [];

    constructor() {
        log('Created new instance of DispensersDao');
    }

    async addDispenser(dispenser: CreateDispenserDto) {
        dispenser.id = nanoid();
        this.dispensers.push(dispenser);
        return dispenser.id;
    }

    async patchDispenserById(id: string, dispenser: CreateDispenserDto) {
        const objIndex = this.dispensers.findIndex(
            (obj: { id: string }) => obj.id === id
        );
        let currentDispenser = this.dispensers[objIndex];
        const allowedPatchFields = [
            'status',
            'updatedAt',
        ];
        for (let field of allowedPatchFields) {
            if (field in dispenser) {
                // @ts-ignore
                currentDispenser[field] = user[field];
            }
        }
        this.dispensers.splice(objIndex, 1, currentDispenser);
        return `${dispenser.id} patched`;
    }

    async getDispenserById(id: string) {
        return this.dispensers.find((user: { id: string }) => user.id === id);
    }    
}

export default new DispensersDao();
