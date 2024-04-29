import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(
      `MongoDB connected on ${connect.connection.host} at ${process.env.MONGO_DB_URL}`
    );
  } catch (error) {
    console.log(`Error connecting to Mongo DB ${error.message}`);
  }
};

export default connectToDB;
