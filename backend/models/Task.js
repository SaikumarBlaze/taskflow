import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TasksSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // unique identifier for the user
    ref: "User", // establishes a relationship with the User schema
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date, 
    required: true,
  },
  status: {
    type: String, 
    enum: ["Pending", "Completed"], // allows only specific values
    default: "Pending",
  },
});

export default model("Task", TasksSchema);
