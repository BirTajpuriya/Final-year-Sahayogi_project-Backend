import mongoose from "mongoose";
const url = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    let { connection } = await mongoose.connect(
      "mongodb://127.0.0.1:27017/sahayogi"
    );
    console.log(`connected to local database`);
  } catch (error) {
    console.log(error);
  }
};
