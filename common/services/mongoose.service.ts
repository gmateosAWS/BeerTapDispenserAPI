import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        //useFindAndModify: false,
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose
            //.connect('mongodb://localhost:27017/api-db', this.mongooseOptions)
            // Connect to "mongo" instead of localhost, as this is the name of the service in the docker settings for the app
            .connect('mongodb://mongodb:27017/api-db', this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, 
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();