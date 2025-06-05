import mongoose from "mongoose";
const connectDB = mongoose.connect('mongodb://localhost:27017/BeatStore')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error))

export default connectDB