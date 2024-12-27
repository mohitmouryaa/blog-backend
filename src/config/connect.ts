import mongoose from "mongoose";

export const connectDb = ()=> {
    try {
        console.log(process.env.MONGO_URL);
        if(!process.env.MONGO_URL) {
            throw new Error('MONGO_URL not present')
        }
         mongoose.connect(process.env.MONGO_URL).then(()=> {
            console.log('db connected');
         })

    } catch(error) {
        console.log(error);
    }
}