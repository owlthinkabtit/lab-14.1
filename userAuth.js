import mongoose from "mongoose";

const uri = process.env.MONGO_URI

async function connectDB() {
  try {
    await mongoose.connect(uri)
    console.log('MongoDB Connected!')
  } catch(e) {
    console.error(e)
  }
}

connectDB()