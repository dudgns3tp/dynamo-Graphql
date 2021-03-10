import mongoose from 'mongoose';
import dotenv from 'dotenv';

let db;
export default new Promise((resolve, reject) => {
    dotenv.config();
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
        `mongodb+srv://ridiServer:${process.env.mongodb_pw}@cluster0.kcu9a.mongodb.net/test`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );

    db = mongoose.connection;
    db.on('error', () => {
        reject(console);
    });
    db.once('open', () => {
        resolve(true);
    });
});
export { db };
