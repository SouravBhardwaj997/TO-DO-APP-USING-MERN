import Todo from "../models/Todo.Schema.js";

const addTodo = async (req, res) => {
  try {
    const user = await req.user;
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Task is required" });
    }
    const todo = await Todo.create({
      title,
      createdBy: user.id,
    });
    return res.status(201).json({ success: true, message: "Task Added", todo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const fetchTodos = async (req, res) => {
  try {
    const user = await req.user;
    const todos = await Todo.find({ createdBy: user.id });
    return res
      .status(200)
      .json({ success: true, message: "Fetched All Todos", todos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!updateTodo) {
      return res
        .status(400)
        .json({ success: false, message: "No Such todo found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully", updatedTodo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Issue" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
      deletedTodo,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addTodo, fetchTodos, updateTodo, deleteTodo };
