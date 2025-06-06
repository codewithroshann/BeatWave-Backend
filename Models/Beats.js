import mongoose from "mongoose";
const { Schema } = mongoose;
const BeatsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  bpm: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
    default:"MP3"
  },
description:{
  type:String,
  required:true,
  default: "No description available"
},

  createdAt:{
    type:Date,
    default:Date.now()
  }
});
const BeatsCollection = mongoose.model("Beat", BeatsSchema);
export default BeatsCollection;
