import { CreateDispenserDto } from '../dto/create.dispenser.dto';
import { PatchDispenserDto } from '../dto/patch.dispenser.dto';
import MongooseService from '../../common/services/mongoose.service';

import { nanoid } from 'nanoid'
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-dao');

class DispensersDao {
    dispensers: Array<CreateDispenserDto> = [];

    Schema = MongooseService.getMongoose().Schema;

    dispenserSchema = new this.Schema({
        _id: String,
        flow_volume: { type: Number, required: true },
        pricePerLiter: { type: Number, required: true, default: 12.25 },
        status: { type: String, required: true, default: 'close' },
        updated_at: Date,
        revenue: { type: Number, default: 0 },
    }, { id: false });
    

    Dispenser = MongooseService.getMongoose().model('Dispensers', this.dispenserSchema);

    constructor() {
        log('Created new instance of DispensersDao');
    }

    async addDispenser(dispenserFields: CreateDispenserDto) {
        const dispenserId = nanoid();
        
        const dispenser = new this.Dispenser({
            _id: dispenserId,
            ...dispenserFields,
        });
        await dispenser.save();
        return { id: dispenserId, flow_volume: dispenser.flow_volume };
    }

    async getDispenserById(id: string) {
        return this.Dispenser.findOne({ _id: id })/*.populate('Dispenser')*/.exec();
    }

    async updateDispenserById(id: string, dispenserFields: PatchDispenserDto) {
        const existingDispenser = await this.Dispenser.findOneAndUpdate(
            { _id: id },
            { $set: dispenserFields },
            { new: true }
        ).exec();
    
        return existingDispenser;
    }

    async getRevenueById(id: string) {
        return this.dispensers.find((dispenser: { id: string }) => dispenser.id === id)?.revenue;
    }       
}

export default new DispensersDao();
