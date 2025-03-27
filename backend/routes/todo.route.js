import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
const router = Router();

router.post("/create", addTodo);

router.get("/fetch", fetchTodos);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
