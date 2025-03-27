import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      require: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("todos", todoSchema);

export default Todo;
