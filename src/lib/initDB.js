import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const initDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Mongo Db Connected');
    }).catch((err) => {
        console.log(err.message);
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose connection is disconnected...");
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to app termination...');
            process.exit(0);
        });
    });
}