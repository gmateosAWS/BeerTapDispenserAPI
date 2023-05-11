import { CreateDispenserDto } from '../dto/create.dispenser.dto';
import { PatchDispenserDto } from '../dto/patch.dispenser.dto';
import MongooseService from '../../common/services/mongoose.service';
import { Schema, Document } from 'mongoose';
import { nanoid } from 'nanoid'
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-dispenser-dao');

// Define the Usage schema
interface IUsage extends Document {
    opened_at: Date,
    closed_at: Date,
    flow_volume: Number,
    total_spent: Number,
}

// Define the Dispenser schema
interface IDispenser extends Document {
    _id: string,
    flow_volume: Number,
    pricePerLiter: Number,
    status: string,
    updated_at: Date,
    amount: Number,
    usages: IUsage['_id'][];
  }

class DispensersDao {
    dispensers: Array<CreateDispenserDto> = [];

    //Schema = MongooseService.getMongoose().Schema;
    //Types = MongooseService.getMongoose().Types;

    usageSchema = new /*this.*/Schema<IUsage>({
        opened_at: { type: Date, required: true },
        closed_at: Date,
        flow_volume: { type: Number, required: true },
        total_spent: Number,
    });

    dispenserSchema = new /*this.*/Schema<IDispenser>({
        _id: String,
        flow_volume: { type: Number, required: true },
        pricePerLiter: { type: Number, required: true, default: 12.25 },
        status: { type: String, required: true, default: 'close' },
        updated_at: Date,
        amount: { type: Number, default: 0 },
        usages: [
            { 
                type: /*this.*/Schema.Types.ObjectId, 
                ref: 'Usage' 
            }
        ]
    }, { id: false });

    Dispenser = MongooseService.getMongoose().model<IDispenser>('Dispenser', this.dispenserSchema);
    Usage = MongooseService.getMongoose().model<IUsage>('Usage', this.usageSchema);    

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
        // Find and update the dispenser (fields that should be updated here are "status" and "updated_at")
        const dispenser = await this.Dispenser.findOneAndUpdate(
            { _id: id },
            { $set: dispenserFields },
            { new: true }
        ).populate({
            path: 'usages',
            model: 'Usage',
        }).exec();
        
        log(`Dispenser ${id} found and updated.`);
        
        if (dispenser) {
            if (dispenserFields.status == 'close') {
                // We are closing a Tap usage, so we find the usage that has no value for "closed_at"
                const currentSpendingLine = dispenser.usages.find((usage) => !usage.closed_at || usage.closed_at === null);

                // Update timestamp for "closed_at" and save dispenser
                if (currentSpendingLine) {
                    currentSpendingLine.closed_at = dispenserFields.updated_at;

                    log(`Dispenser ${id}: closing tap ${currentSpendingLine._id} at ${currentSpendingLine.closed_at}`);

                    // Calculate "total_spent" for this usage
                    const timeDiff = new Date(currentSpendingLine.closed_at).valueOf() - new Date(currentSpendingLine.opened_at).valueOf();
                    const liters = (timeDiff / 1000) * dispenser.flow_volume.valueOf();
                    currentSpendingLine.total_spent += liters * dispenser.pricePerLiter.valueOf();
    
                    const savedCurrentSpendingLine = await currentSpendingLine.save();
                    log(`Dispenser ${id}: total spent for this spending line ${savedCurrentSpendingLine.total_spent}`);

                    // Save the updated dispenser
                    await dispenser.save();
                }
            } else if (dispenserFields.status == 'open') {
                log(`Dispenser ${id}: opening tap at ${dispenserFields.updated_at}`);

                // We are opening the dispenser, thus creating a new usage or spending line
                const newSpendingLine: IUsage = new this.Usage({
                    opened_at: dispenserFields.updated_at,
                    flow_volume: dispenser.flow_volume,
                    total_spent: 0
                });

                // Save the new usage
                const savedNewSpendingLine = await newSpendingLine.save();

                log(`Dispenser ${id}: opened new spending line ${savedNewSpendingLine._id}.`);

                // Add the new usage to the dispenser's usages array
                dispenser.usages.push(savedNewSpendingLine._id);

                // Save the updated dispenser
                await dispenser.save();                
            }
        }

        return dispenser;
    }

    async getAmountById(id: string) {
        return this.dispensers.find((dispenser: { id: string }) => dispenser.id === id)?.amount;
    }       
}

export default new DispensersDao();
