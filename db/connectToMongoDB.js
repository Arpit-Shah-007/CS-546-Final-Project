import mongoose from "mongoose"

const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Successfully Connected to Mongo DB")
    } catch (error) {
        console.log("Error connecting to Mongo DB", error.messsage)
    }
}