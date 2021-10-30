
import mongoose from 'mongoose';
//import from env
require('dotenv').config({ path: './.env' })


export const connectDB = () => {
    mongoose.set('debug', true);

    mongoose.connect(process.env.MONGO_URI as string);

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(process.env.MONGO_URI as string);
    });
    mongoose.connection.on('error', err => {
        console.error(err);
    });

    mongoose.connection.on('open', async () => {
        console.log('Connected to MongoDB ');
    });
};