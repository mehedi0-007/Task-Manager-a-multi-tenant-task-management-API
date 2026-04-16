import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
});
