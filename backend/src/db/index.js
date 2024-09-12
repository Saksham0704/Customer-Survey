import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://sakshamagarwal1616:<password>@cluster0.lsrr3.mongodb.net/myDatabase?retryWrites=true&w=majority";

        const connectionInstance = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR:", error);
        process.exit(1);
    }
}

export default connectDB;
