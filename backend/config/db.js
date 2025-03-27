import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected ", conn.connection.host);
  } catch (error) {
    console.log("error while connect to db:", error);
  }
};

export default connectToDB;
