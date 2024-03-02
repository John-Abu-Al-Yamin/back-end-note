import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected ^_^");
  } catch (error) {
    console.log("error DB",error);
    process.exit(1);
  }
};
