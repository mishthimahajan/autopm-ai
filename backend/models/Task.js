import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  assignee: String,
  deadline: String,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Task", taskSchema);